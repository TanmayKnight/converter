'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import { Button } from '@/components/ui/button';
import { Upload, Scissors, Download, FileVideo, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';


export default function VideoTrimmerClient() {
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [duration, setDuration] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const ffmpegRef = useRef<FFmpeg | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const messageRef = useRef<HTMLParagraphElement>(null);

    const checkCodecSupport = () => {
        const video = document.createElement('video');
        const types = [
            'video/mp4; codecs="avc1.42E01E, mp4a.40.2"', // H.264
            'video/mp4; codecs="hvc1"', // HEVC/H.265
            'video/webm; codecs="vp8, vorbis"',
            'video/webm; codecs="vp9"'
        ];
        return types.map(t => `${t}: ${video.canPlayType(t)}`).join(' | ');
    };

    const load = async () => {
        setIsLoading(true);
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        try {
            // Lazy load FFmpeg to prevent SSR error
            if (!ffmpegRef.current) {
                ffmpegRef.current = new FFmpeg();
            }
            const ffmpeg = ffmpegRef.current;

            ffmpeg.on('log', ({ message }) => {
                if (messageRef.current) messageRef.current.innerHTML = message;
                console.log(message);
            });
            ffmpeg.on('progress', ({ progress, time }) => {
                setProgress(Math.round(progress * 100));
            });

            // Use fetchFile/toBlobURL to load WASM from CDN
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
            setLoaded(true);
            toast.success('Video Engine Loaded');
        } catch (err) {
            console.error(err);
            toast.error('Failed to load Video Engine. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const [isOptimizing, setIsOptimizing] = useState(false);

    // Store original file separately from the display URL source
    const originalFileRef = useRef<File | null>(null);

    // Check if the browser can likely play this file
    const isFormatSupported = (file: File) => {
        const video = document.createElement('video');
        return video.canPlayType(file.type) !== '';
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setVideoFile(file); // For UI display info
        originalFileRef.current = file;
        setDownloadUrl(null);
        setProgress(0);
        setIsPreviewMode(false);
        setVideoUrl(null);

        // Auto-detect compatibility
        if (isFormatSupported(file)) {
            // Supported: Load directly
            setVideoUrl(URL.createObjectURL(file));
        } else {
            // Unsupported: Auto-create proxy
            await createProxy(file);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            const videoDuration = videoRef.current.duration;
            setDuration(videoDuration);
            setEndTime(videoDuration);
            setStartTime(0);
        }
    };

    const createProxy = async (file: File) => {
        if (!ffmpegRef.current) return;
        setIsOptimizing(true);
        setStatus('Optimizing video for playback (Converting to H.264 Proxy)...');

        try {
            const ffmpeg = ffmpegRef.current;
            await ffmpeg.writeFile('input_original.mp4', await fetchFile(file));

            // Create a low-res proxy for the timeline player
            // preset ultrafast: Fastest encoding
            // scale 480:-2: Downscale to 480p width (maintain aspect) for speed
            await ffmpeg.exec([
                '-i', 'input_original.mp4',
                '-vf', 'scale=480:-2',
                '-c:v', 'libx264',
                '-preset', 'ultrafast',
                '-crf', '30', // Low quality for proxy is fine
                '-c:a', 'aac',
                'proxy.mp4'
            ]);

            const data = await ffmpeg.readFile('proxy.mp4');
            const url = URL.createObjectURL(
                new Blob([(data as any).buffer], { type: 'video/mp4' })
            );
            setVideoUrl(url);
            setIsPreviewMode(true);
            toast.success('Video optimized for browser playback.');
        } catch (e) {
            console.error(e);
            toast.error('Failed to optimize video. Preview might be black.');
            // Fallback to original (even if black screen)
            setVideoUrl(URL.createObjectURL(file));
        } finally {
            setIsOptimizing(false);
            setStatus('');
        }
    };

    const trimVideo = async () => {
        const sourceFile = originalFileRef.current;
        if (!sourceFile || !loaded || !ffmpegRef.current) return;

        setIsProcessing(true);
        setStatus('Trimming original video (Lossless)...');

        try {
            const ffmpeg = ffmpegRef.current;
            // Write original file again (in case it was overwritten or not present)
            // Note: If we already wrote 'input_original.mp4' in createProxy, we could reuse it, 
            // but rewriting ensures safety for the 'Direct Load' path.
            // Check if file exists in MEMFS would be an optimization, but overwriting is safe.
            await ffmpeg.writeFile('input_final.mp4', await fetchFile(sourceFile));

            // Precise Trim on the High-Quality Original
            await ffmpeg.exec([
                '-i', 'input_final.mp4',
                '-ss', startTime.toString(),
                '-to', endTime.toString(),
                '-c', 'copy', // Stream copy for lossless instant trim
                'output.mp4'
            ]);

            const data = await ffmpeg.readFile('output.mp4');
            const url = URL.createObjectURL(
                new Blob([(data as any).buffer], { type: 'video/mp4' }) // Output is container of input, usually MP4
            );
            setDownloadUrl(url);
            setStatus('Done!');
            toast.success('Video Trimmed Successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to trim video.');
        } finally {
            setIsProcessing(false);
        }
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-bold text-foreground">
                    Video Trimmer
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Trim videos instantly in your browser. No server upload required.
                </p>
            </div>

            {!loaded && (
                <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading Video Engine (First time may take a few seconds)...</p>
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
                                Drag and drop or click to select a video file (MP4, WEBM).
                            </p>
                        </div>
                        <input type="file" accept="video/*" onChange={handleUpload} className="hidden" />
                    </label>
                </div>
            )}

            {videoFile && videoUrl && (
                <div className="space-y-6 animate-in fade-in">

                    {/* Video Player & Debug */}
                    <div className="space-y-2">
                        {isPreviewMode && (
                            <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs text-center py-1 rounded">
                                Preview Mode (First 10s, H.264 Transcoded)
                            </div>
                        )}
                        <div className="aspect-video bg-muted rounded-xl overflow-hidden shadow-lg relative max-h-[500px] mx-auto border border-border">
                            <video
                                key={videoUrl}
                                ref={videoRef}
                                src={videoUrl}
                                controls
                                playsInline
                                className="w-full h-full object-contain"
                                onLoadedMetadata={handleLoadedMetadata}
                                onError={(e) => {
                                    console.error('Video Error:', e.currentTarget.error);
                                    setStatus(`Error: ${e.currentTarget.error?.message || 'Unknown playback error'}`);
                                }}
                            />
                        </div>

                        {/* Debug Info & Warnings */}
                        <div className="space-y-2">
                            {/* Optimization / Codec Tools */}
                            <div className="flex flex-col items-center gap-2 p-3 bg-secondary/30 border border-border rounded-lg animate-in fade-in">
                                <div className="flex items-center justify-between w-full gap-4">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>Playback issues?</span>
                                    </div>
                                    {!isPreviewMode ? (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => createProxy(videoFile!)}
                                            disabled={isOptimizing}
                                            className="h-8 text-xs bg-sidebar-accent hover:bg-sidebar-accent/80 border border-border shadow-sm transition-all"
                                        >
                                            {isOptimizing ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <span className="mr-2">⚡</span>}
                                            {isOptimizing ? 'Optimizing...' : 'Optimize Preview'}
                                        </Button>
                                    ) : (
                                        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded border border-green-200 dark:border-green-800/50">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                            Using Optimized Preview
                                        </div>
                                    )}
                                </div>
                                {!isPreviewMode && (
                                    <p className="text-[10px] text-muted-foreground/70 text-center w-full">
                                        Generates a smooth H.264 proxy for the first 60s. Final trim uses original quality.
                                    </p>
                                )}
                            </div>

                            {/* Codec Warning & Optimization Status */}
                            {isOptimizing && (
                                <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300 animate-pulse border border-blue-200 dark:border-blue-800">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Optimizing video for browser support (This may take a moment)...</span>
                                </div>
                            )}

                            <span>Dim: {videoRef.current?.videoWidth}x{videoRef.current?.videoHeight}</span>
                            <span>State: {videoRef.current?.readyState || 0}</span>
                        </div>

                        {/* HEVC/Codec Note */}
                        {isPreviewMode && !isOptimizing && (
                            <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 p-2 rounded justify-center">
                                <AlertCircle className="h-3 w-3" />
                                <span>Playing low-res preview. Trimming will apply to original lossless quality.</span>
                            </div>
                        )}
                    </div>

                    {/* Timeline Controls */}
                    <div className="bg-card border border-border p-6 rounded-xl space-y-6">
                        <div className="flex justify-between items-center text-sm font-medium">
                            <div className="space-y-1">
                                <span className="text-muted-foreground">Start Time</span>
                                <div className="text-lg">{formatTime(startTime)}</div>
                            </div>
                            <div className="space-y-1 text-right">
                                <span className="text-muted-foreground">End Time</span>
                                <div className="text-lg">{formatTime(endTime)}</div>
                            </div>
                        </div>

                        {/* Simple Range Inputs for Start/End (MVP) */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground">Start Point</label>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration}
                                    step="0.1"
                                    value={startTime}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        if (val < endTime) {
                                            setStartTime(val);
                                            if (videoRef.current) videoRef.current.currentTime = val;
                                        }
                                    }}
                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground">End Point</label>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration}
                                    step="0.1"
                                    value={endTime}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        if (val > startTime) {
                                            setEndTime(val);
                                            if (videoRef.current) videoRef.current.currentTime = val;
                                        }
                                    }}
                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button onClick={() => setVideoFile(null)} variant="outline" className="flex-1">
                                Cancel
                            </Button>
                            <Button onClick={trimVideo} disabled={isProcessing} className="flex-1 gap-2">
                                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scissors className="h-4 w-4" />}
                                {isProcessing ? `Processing...` : 'Trim Video'}
                            </Button>
                        </div>
                    </div>

                    {/* Download Section (Restored/Fixed) */}
                    {downloadUrl && (
                        <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl flex items-center justify-between animate-in slide-in-from-bottom-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-600">
                                    <FileVideo className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-green-700 dark:text-green-400">Video Ready!</h3>
                                    <p className="text-sm text-green-600/80 dark:text-green-500/80">Your trimmed clip is ready to save.</p>
                                </div>
                            </div>
                            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                                <a href={downloadUrl} download="trimmed-video.mp4">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </a>
                            </Button>
                        </div>
                    )}

                </div>
            )}



        </div>
    );
}
