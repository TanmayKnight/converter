'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toaster, toast } from 'sonner';
import { Loader2, Mic, Upload, Play, Download, Square, Music, Wand2, Lock } from 'lucide-react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { usePro } from '@/hooks/usePro';
import { cn } from '@/lib/utils';
import { ProGate } from '@/components/ui/pro-gate';


const PRESETS = [
    { id: 'chipmunk', name: 'Chipmunk', icon: '🐿️', filter: 'asetrate=44100*1.5,aresample=44100,atempo=1' },
    { id: 'robot', name: 'Robot', icon: '🤖', filter: 'asetrate=44100*0.8,aresample=44100,atempo=1.25,aecho=0.8:0.9:1000:0.3', isProOnly: true },
    { id: 'deep', name: 'Deep Voice', icon: '👹', filter: 'asetrate=44100*0.7,aresample=44100,atempo=1.3', isProOnly: true },
    { id: 'fast', name: 'Speed Up', icon: '⏩', filter: 'atempo=1.5' },
    { id: 'slow', name: 'Slow Motion', icon: '🐢', filter: 'atempo=0.7', isProOnly: true },
];

export default function VoiceChangerClient() {
    const { isPro, isLoading: isProLoading } = usePro();
    const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
    const [showPaywall, setShowPaywall] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        const ffmpegInstance = new FFmpeg();

        ffmpegInstance.on('log', ({ message }) => {
            console.log(message);
        });

        try {
            await ffmpegInstance.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
            setFfmpeg(ffmpegInstance);
            setLoaded(true);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load Audio Engine');
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
                setAudioFile(file);
                setAudioUrl(URL.createObjectURL(blob));
                setProcessedUrl(null); // Clear previous
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            toast.error('Microphone access denied');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            // Stop all tracks
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAudioFile(file);
            setAudioUrl(URL.createObjectURL(file));
            setProcessedUrl(null);
        }
    };

    const processAudio = async () => {
        if (!ffmpeg || !loaded || !audioFile || !selectedPreset) return;

        setIsProcessing(true);
        try {
            const inputName = 'input.' + audioFile.name.split('.').pop();
            const outputName = 'output.mp3';

            await ffmpeg.writeFile(inputName, await fetchFile(audioFile));

            const filter = PRESETS.find(p => p.id === selectedPreset)?.filter || '';

            // Basic command: input -> filter -> output
            await ffmpeg.exec([
                '-i', inputName,
                '-af', filter,
                outputName
            ]);

            const data = await ffmpeg.readFile(outputName);
            const blob = new Blob([(data as any)], { type: 'audio/mp3' });
            setProcessedUrl(URL.createObjectURL(blob));
            toast.success('Audio processed!');
        } catch (error) {
            console.error(error);
            toast.error('Conversion failed');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                    <Wand2 className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Voice Changer Studio
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Record your voice or upload audio and transform it instantly.
                    Professional audio filters using WebAssembly.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Input Section */}
                <Card className="p-6 space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Mic className="h-5 w-5" /> Source Audio
                    </h2>

                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                variant={isRecording ? "destructive" : "default"}
                                onClick={isRecording ? stopRecording : startRecording}
                                className="h-24 flex flex-col gap-2"
                            >
                                {isRecording ? <Square className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                                {isRecording ? "Stop Recording" : "Record Voice"}
                            </Button>

                            <div className="relative h-24">
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="absolute inset-0 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 transition-colors">
                                    <Upload className="h-8 w-8 text-muted-foreground" />
                                    <span className="text-sm font-medium">Upload File</span>
                                </div>
                            </div>
                        </div>

                        {audioUrl && (
                            <div className="p-4 bg-secondary/30 rounded-xl">
                                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase">Original Preview</p>
                                <audio controls src={audioUrl} className="w-full h-8" />
                            </div>
                        )}
                    </div>
                </Card>

                {/* Effect Section */}
                <Card className="p-6 space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Music className="h-5 w-5" /> Select Effect
                    </h2>

                    {isProLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-pulse">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-24 rounded-xl bg-secondary border border-border" />
                            ))}
                        </div>
                    ) : showPaywall ? (
                        <div className="py-8">
                            <ProGate
                                isPro={isPro}
                                title="Premium Voice Filters"
                                description="Robot, Deep Voice, and Slow Motion effects are available for Pro users."
                                blurAmount="lg"
                            >
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 opacity-40 pointer-events-none">
                                    {PRESETS.map(preset => (
                                        <div
                                            key={preset.id}
                                            className="p-3 rounded-xl border flex flex-col items-center gap-2 border-border"
                                        >
                                            <span className="text-2xl">{preset.icon}</span>
                                            <span className="text-sm font-medium">{preset.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </ProGate>
                            <div className="text-center mt-6">
                                <Button variant="ghost" onClick={() => setShowPaywall(false)}>
                                    Use Free Voices
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {PRESETS.map(preset => {
                                const isLocked = preset.isProOnly && !isPro;

                                return (
                                    <button
                                        key={preset.id}
                                        onClick={() => {
                                            if (isLocked) {
                                                setShowPaywall(true);
                                                return;
                                            }
                                            setSelectedPreset(preset.id);
                                        }}
                                        className={cn(
                                            "relative p-3 rounded-xl border flex flex-col items-center gap-2 transition-all overflow-hidden",
                                            selectedPreset === preset.id
                                                ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                                                : 'border-border hover:border-primary/50 hover:bg-secondary/50',
                                            isLocked && "opacity-70"
                                        )}
                                    >
                                        {isLocked && (
                                            <div className="absolute top-2 right-2">
                                                <Lock className="h-3 w-3 text-muted-foreground" />
                                            </div>
                                        )}
                                        <span className="text-2xl">{preset.icon}</span>
                                        <span className="text-sm font-medium flex items-center gap-1">
                                            {preset.name}
                                            {preset.isProOnly && <span className="text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-white px-1 rounded ml-1">PRO</span>}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <Button
                        onClick={processAudio}
                        disabled={!loaded || !audioFile || !selectedPreset || isProcessing}
                        className="w-full h-12 text-lg"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                            </>
                        ) : (
                            'Apply Effect'
                        )}
                    </Button>

                    {processedUrl && (
                        <div className="animate-in fade-in slide-in-from-top-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-green-600">Result Ready!</span>
                                <a
                                    href={processedUrl}
                                    download={`voice_${selectedPreset}.mp3`}
                                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                                >
                                    <Download className="h-3 w-3" /> Download MP3
                                </a>
                            </div>
                            <audio controls src={processedUrl} className="w-full h-8" />
                        </div>
                    )}

                </Card>
            </div >



        </div>
    );
}
