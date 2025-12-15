'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Toaster, toast } from 'sonner';
import { Loader2, Upload, Play, Download, Music, Volume2, X, Plus } from 'lucide-react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';


interface AudioTrack {
    id: string;
    file: File;
    name: string;
    volume: number; // 0 to 1 (or higher)
    duration?: number;
}

export default function AudioMixerClient() {
    const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [tracks, setTracks] = useState<AudioTrack[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [mixedUrl, setMixedUrl] = useState<string | null>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        const ffmpegInstance = new FFmpeg();
        ffmpegInstance.on('log', ({ message }) => console.log(message));
        try {
            await ffmpegInstance.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
            setFfmpeg(ffmpegInstance);
            setLoaded(true);
        } catch (error) {
            toast.error('Failed to load Audio Engine');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newTracks = Array.from(e.target.files).map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                file,
                name: file.name,
                volume: 1.0,
            }));
            setTracks(prev => [...prev, ...newTracks]);
            // Reset mixed output when tracks change
            setMixedUrl(null);
        }
    };

    const removeTrack = (id: string) => {
        setTracks(prev => prev.filter(t => t.id !== id));
        setMixedUrl(null);
    };

    const updateVolume = (id: string, newVolume: number) => {
        setTracks(prev => prev.map(t => t.id === id ? { ...t, volume: newVolume } : t));
    };

    const mixAudio = async () => {
        if (!ffmpeg || !loaded || tracks.length < 2) {
            toast.error('Please add at least 2 tracks to mix.');
            return;
        }

        setIsProcessing(true);
        try {
            const inputs: string[] = [];
            const filterParts: string[] = [];

            // Write files to ffmpeg filesystem
            for (let i = 0; i < tracks.length; i++) {
                const track = tracks[i];
                const fileName = `input${i}.${track.file.name.split('.').pop()}`;
                await ffmpeg.writeFile(fileName, await fetchFile(track.file));
                inputs.push('-i', fileName);
                // Volume filter: [0]volume=1.0[a0];
                filterParts.push(`[${i}]volume=${track.volume}[a${i}]`);
            }

            // Mix filter: [a0][a1]amix=inputs=2:duration=longest[out]
            const mixInputs = tracks.map((_, i) => `[a${i}]`).join('');
            const filterComplex = `${filterParts.join(';')};${mixInputs}amix=inputs=${tracks.length}:duration=longest[out]`;

            await ffmpeg.exec([
                ...inputs,
                '-filter_complex', filterComplex,
                '-map', '[out]',
                'output.mp3'
            ]);

            const data = await ffmpeg.readFile('output.mp3');
            const blob = new Blob([(data as any)], { type: 'audio/mp3' });
            setMixedUrl(URL.createObjectURL(blob));
            toast.success('Audio mixed successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to mix audio');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                    <Music className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Audio Mixer Studio
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Combine multiple audio tracks into one. Adjust volumes and merge songs, voiceovers, and background music instantly.
                </p>
            </div>

            <div className="grid gap-8">
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Music className="h-5 w-5" /> Audio Tracks
                        </h2>
                        <div className="relative">
                            <input
                                type="file"
                                multiple
                                accept="audio/*"
                                onChange={handleFileUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <Button variant="outline" className="gap-2">
                                <Plus className="h-4 w-4" /> Add Tracks
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {tracks.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No tracks added. Upload audio files to start mixing.</p>
                            </div>
                        )}

                        {tracks.map((track) => (
                            <div key={track.id} className="flex items-center gap-4 p-4 bg-secondary/20 rounded-lg border border-border">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Music className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{track.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                                        <Slider
                                            value={[track.volume * 100]} // Scale to 0-100 for slider
                                            onValueChange={(vals) => updateVolume(track.id, vals[0] / 100)}
                                            max={150} // Allow boost up to 1.5x
                                            step={1}
                                            className="w-32"
                                        />
                                        <span className="text-xs text-muted-foreground w-8 text-right">
                                            {Math.round(track.volume * 100)}%
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeTrack(track.id)}
                                    className="text-muted-foreground hover:text-destructive"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="flex justify-center">
                    <Button
                        size="lg"
                        onClick={mixAudio}
                        disabled={!loaded || tracks.length < 2 || isProcessing}
                        className="w-full md:w-auto min-w-[200px]"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Mixing...
                            </>
                        ) : (
                            'Merge Tracks'
                        )}
                    </Button>
                </div>

                {mixedUrl && (
                    <Card className="p-6 bg-green-500/10 border-green-500/20">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4 w-full">
                                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                    <Play className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-green-700">Mix Ready!</h3>
                                    <p className="text-sm text-green-600/80">Your audio tracks have been merged successfully.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <audio controls src={mixedUrl} className="h-10 flex-1 md:w-64" />
                                <a
                                    href={mixedUrl}
                                    download="mix_output.mp3"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                >
                                    <Download className="mr-2 h-4 w-4" /> Download
                                </a>
                            </div>
                        </div>
                    </Card>
                )}

            </div>


        </div>
    );
}
