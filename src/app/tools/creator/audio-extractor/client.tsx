'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import { Button } from '@/components/ui/button';
import { Upload, Music, Download, FileAudio, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AudioExtractorClient() {
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

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

            // Extract audio: -vn (no video), -acodec libmp3lame (MP3), -b:a 192k (High Quality)
            // -q:a 2 is a VBR setting ~190kbps, but -b:a 192k is more standard CBR.
            await ffmpeg.exec([
                '-i', 'input.mp4',
                '-vn',
                '-acodec', 'libmp3lame',
                '-b:a', '192k',
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

            {/* SEO Content */}
            <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Extract Audio from Video Online</h2>
                <p>
                    Easily convert video files to high-quality MP3 audio directly in your browser.
                    Perfect for extracting songs, speeches, or background music from your videos.
                </p>
                <ul>
                    <li><strong>Supports Any Format</strong>: Works with MP4, MKV, MOV, WebM, and more.</li>
                    <li><strong>High Quality</strong>: Extracts typically at 192kbps MP3 stereo.</li>
                    <li><strong>Privacy Focused</strong>: All processing happens on your device. No files are uploaded.</li>
                </ul>
            </div>

        </div>
    );
}
