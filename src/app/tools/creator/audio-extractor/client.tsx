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
            <div className="mt-16 prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Extract Audio from Video: The Ultimate Guide</h2>
                <p>
                    Sometimes the video isn't what matters—it's the sound. Whether it's a speech, a concert recording, or a podcast episode filmed as a video,
                    <strong>UnitMaster Audio Extractor</strong> lets you isolate the audio track and save it as a high-quality MP3 file in seconds.
                </p>

                <h3>How Audio Extraction Works</h3>
                <p>
                    Video files (like MP4 or MOV) are "containers" that hold both a video stream (visuals) and an audio stream (sound).
                    Our tool uses a process called <strong>demuxing</strong> and <strong>transcoding</strong>. It effectively ignores the heavy visual data and focuses only on processing the audio stream.
                </p>
                <p>
                    By default, we convert your audio to <strong>MP3 format at 192kbps</strong>. This bitrate offers the perfect balance between crystal-clear sound quality and a manageable file size, suitable for any music player or editing software.
                </p>

                <h3>Use Cases for Audio Extraction</h3>
                <ul>
                    <li><strong>Podcasters</strong>: Convert your video interviews into audio episodes for Spotify or Apple Podcasts.</li>
                    <li><strong>Musicians</strong>: Extract a sample or backing track from a video recording of a session.</li>
                    <li><strong>Students</strong>: Turn a recorded lecture video into an MP3 so you can listen to it while commuting/walking.</li>
                    <li><strong>Transcription</strong>: It's much easier to upload a small MP3 file to transcription services than a massive video file.</li>
                </ul>

                <h3>Supported Inputs</h3>
                <p>
                    We support a wide range of video inputs, including:
                </p>
                <ul>
                    <li><strong>MP4</strong>: The most common video format.</li>
                    <li><strong>MOV</strong>: Apple's QuickTime format.</li>
                    <li><strong>WebM</strong>: Common for web-based recordings.</li>
                    <li><strong>MKV</strong>: High-quality archival format.</li>
                </ul>

                <h3>Why Choose Client-Side Extraction?</h3>
                <p>
                    Processing audio requires significant computing power. Most online converters upload your file to a cloud server to process it.
                    This creates two problems: <strong>Privacy risk</strong> and <strong>Wait times</strong>.
                </p>
                <p>
                    UnitMaster runs entirely in your browser using <strong>WebAssembly</strong>. Your CPU handles the extraction. This means your private voice recordings or unreleased music never leave your machine, and you don't need to depend on slow upload speeds.
                </p>
            </div>

        </div>
    );
}
