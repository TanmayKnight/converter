'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import { Button } from '@/components/ui/button';
import { Upload, Music, Download, FileAudio, CheckCircle, Loader2, AlertCircle, Lock, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { usePro } from '@/hooks/usePro';


export default function AudioExtractorClient() {
    const { isPro } = usePro();
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [quality, setQuality] = useState<'128k' | '320k'>('128k');

    const ffmpegRef = useRef<FFmpeg | null>(null);
    const messageRef = useRef<HTMLParagraphElement>(null);

    const load = async () => {
        setIsLoading(true);
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        try {
            if (!ffmpegRef.current) {
                ffmpegRef.current = new FFmpeg();
            }
            const ffmpeg = ffmpegRef.current;

            ffmpeg.on('log', ({ message }) => {
                console.log(message);
            });
            ffmpeg.on('progress', ({ progress }) => {
                setProgress(Math.round(progress * 100));
            });

            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
            setLoaded(true);
            toast.success('Audio Engine Loaded');
        } catch (err) {
            console.error(err);
            toast.error('Failed to load Audio Engine. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setVideoFile(file);
        setDownloadUrl(null);
        setProgress(0);
        setStatus('');
    };

    const convertToMp3 = async () => {
        if (!videoFile || !loaded || !ffmpegRef.current) return;

        setIsProcessing(true);
        setStatus('Extracting audio track...');

        try {
            const ffmpeg = ffmpegRef.current;
            await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));

            // Extract audio: -vn (no video), -acodec libmp3lame (MP3)
            await ffmpeg.exec([
                '-i', 'input.mp4',
                '-vn',
                '-acodec', 'libmp3lame',
                '-b:a', quality,
                'output.mp3'
            ]);

            const data = await ffmpeg.readFile('output.mp3');
            const url = URL.createObjectURL(
                new Blob([(data as any).buffer], { type: 'audio/mpeg' })
            );
            setDownloadUrl(url);
            setStatus('Conversion Complete!');
            toast.success('Audio Extracted Successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to extract audio.');
            setStatus('Error during conversion.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-bold text-foreground">
                    Audio Extractor
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Extract MP3 audio from any video file instantly.
                </p>
            </div>

            {!loaded && (
                <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading Audio Engine...</p>
                </div>
            )}

            {loaded && !videoFile && (
                <div className="max-w-2xl mx-auto">
                    <label className="bg-card border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors rounded-xl p-10 flex flex-col items-center justify-center space-y-6 cursor-pointer group">
                        <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="space-y-2 text-center">
                            <h3 className="font-semibold text-lg">Upload Video</h3>
                            <p className="text-sm text-muted-foreground">
                                Drag and drop or click to select a video file (MP4, WEBM, MOV).
                            </p>
                        </div>
                        <input type="file" accept="video/*" onChange={handleUpload} className="hidden" />
                    </label>
                </div>
            )}

            {videoFile && (
                <div className="max-w-xl mx-auto space-y-6 animate-in fade-in">
                    <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <FileAudio className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-medium truncate max-w-[200px]">{videoFile.name}</h3>
                                <p className="text-xs text-muted-foreground">
                                    {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setVideoFile(null)} disabled={isProcessing}>
                            Change
                        </Button>
                    </div>

                    {/* Quality Selector */}
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            onClick={() => setQuality('128k')}
                            className={`cursor-pointer border rounded-lg p-3 text-center transition-all ${quality === '128k' ? 'bg-primary/5 border-primary ring-1 ring-primary' : 'hover:bg-secondary/50'}`}
                        >
                            <div className="font-semibold text-sm">Standard</div>
                            <div className="text-xs text-muted-foreground">128 kbps</div>
                        </div>
                        <div
                            onClick={() => {
                                if (isPro) {
                                    setQuality('320k');
                                } else {
                                    window.location.href = '/pricing';
                                }
                            }}
                            className={`relative cursor-pointer border rounded-lg p-3 text-center transition-all ${quality === '320k' ? 'bg-primary/5 border-primary ring-1 ring-primary' : 'hover:bg-secondary/50'} ${!isPro ? 'opacity-70' : ''}`}
                        >
                            <div className="font-semibold text-sm flex items-center justify-center gap-1">
                                High Quality
                                {!isPro && <Lock className="h-3 w-3 text-amber-500" />}
                                {isPro && <Crown className="h-3 w-3 text-yellow-500" />}
                            </div>
                            <div className="text-xs text-muted-foreground">320 kbps</div>
                        </div>
                    </div>

                    {!downloadUrl ? (
                        <Button
                            size="lg"
                            className="w-full gap-2"
                            onClick={convertToMp3}
                            disabled={isProcessing}
                        >
                            {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Music className="h-5 w-5" />}
                            {isProcessing ? `Converting... ${progress > 0 ? `${progress}%` : ''}` : 'Extract Audio (MP3)'}
                        </Button>
                    ) : (
                        <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl flex items-center justify-between animate-in slide-in-from-bottom-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-600">
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-green-700 dark:text-green-400">Audio Extracted!</h3>
                                    <p className="text-sm text-green-600/80 dark:text-green-500/80">Your MP3 file is ready.</p>
                                </div>
                            </div>
                            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                                <a href={downloadUrl} download={`${videoFile.name.split('.')[0]}.mp3`}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download MP3
                                </a>
                            </Button>
                        </div>
                    )}

                    {isProcessing && (
                        <p className="text-xs text-center text-muted-foreground animate-pulse">
                            {status || 'Processing video...'}
                        </p>
                    )}

                </div>
            )}





        </div>
    );
}
