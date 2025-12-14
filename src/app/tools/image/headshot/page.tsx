'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { removeBackground } from '@imgly/background-removal';
import { ImageDropzone } from '@/components/image-tools/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Download,
    X,
    Loader2,
    RotateCw,
    ZoomIn,
    ZoomOut,
    Move,
    Shirt,
    User,
    SlidersHorizontal,
    Sun,
    Contrast,
    Undo,
    MousePointer2
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SUIT_ASSETS = [
    {
        id: 'suit-navy',
        name: 'Navy Corporate',
        src: '/suits/navy.png'
    },
    {
        id: 'suit-grey',
        name: 'Charcoal Grey',
        src: '/suits/grey.png'
    },
    {
        id: 'suit-black',
        name: 'Executive Black',
        src: '/suits/black.png'
    }
];

export default function ManualHeadshotPage() {
    const [step, setStep] = useState<'upload' | 'processing' | 'editor'>('upload');
    const [headImg, setHeadImg] = useState<string>('');
    const [status, setStatus] = useState('');

    // Editor State
    const [activeLayer, setActiveLayer] = useState<'head' | 'suit'>('head');
    const [selectedSuit, setSelectedSuit] = useState(SUIT_ASSETS[0]);

    // Layer Transforms
    const [headState, setHeadState] = useState({
        x: 80,
        y: 20, // Moved up to give room
        width: 160,
        height: 160,
        rotation: 0,
        brightness: 100,
        contrast: 100,
        flip: false
    });

    const [suitState, setSuitState] = useState({
        x: 0,
        y: 180,
        width: 320, // Fill width initially
        height: 400, // Approx aspect ratio
        brightness: 100
    });

    // Process Upload
    async function onSelectFile(file: File) {
        setStep('processing');
        setStatus('Initializing local background remover (WASM)...');

        const reader = new FileReader();
        reader.onload = async () => {
            const src = reader.result as string;
            try {
                setStatus('Removing background (Running locally)...');
                const blob = await removeBackground(src, {
                    progress: (key, current, total) => {
                        const pct = Math.round((current / total) * 100);
                        setStatus(`Processing ${key}: ${pct}%`);
                    }
                });
                const cleanUrl = URL.createObjectURL(blob);
                setHeadImg(cleanUrl);
                setStep('editor');
            } catch (e) {
                console.error(e);
                setStatus('Detailed BG removal failed. Trying fallback...');
                setHeadImg(src);
                setStep('editor');
            }
        };
        reader.readAsDataURL(file);
    }

    async function onDownload() {
        const canvas = document.createElement('canvas');
        canvas.width = 800; // Output Width
        canvas.height = 1000; // Output Height (4:5 Ratio)
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Scale Factor (Preview is 320px wide)
        const s = 800 / 320;

        // 1. Background
        const gradient = ctx.createRadialGradient(400, 300, 0, 400, 500, 800);
        gradient.addColorStop(0, "#eef2f6");
        gradient.addColorStop(1, "#cfd8dc");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const loadImg = (src: string) => new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.src = src;
        });

        const suitImg = await loadImg(selectedSuit.src);
        const headImage = await loadImg(headImg);

        // 2. Draw Suit (Bottom Layer)
        // Note: Suit is just an image, but now we have draggable transform for it too.
        ctx.save();
        ctx.filter = `brightness(${suitState.brightness}%)`;
        ctx.drawImage(
            suitImg,
            suitState.x * s,
            suitState.y * s,
            suitState.width * s,
            suitState.height * s
        );
        ctx.restore();

        // 3. Draw Head (Top Layer)
        ctx.save();
        ctx.filter = `brightness(${headState.brightness}%) contrast(${headState.contrast}%)`;

        // Pivot point for Rotation
        const cx = (headState.x * s) + (headState.width * s) / 2;
        const cy = (headState.y * s) + (headState.height * s) / 2;

        ctx.translate(cx, cy);
        ctx.rotate(headState.rotation * Math.PI / 180);
        if (headState.flip) ctx.scale(-1, 1);
        ctx.translate(-cx, -cy);

        ctx.drawImage(
            headImage,
            headState.x * s,
            headState.y * s,
            headState.width * s,
            headState.height * s
        );
        ctx.restore();

        // Export
        const blob = await new Promise<Blob | null>(r => canvas.toBlob(r));
        if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.download = 'professional-headshot.png';
            a.href = url;
            a.click();
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center space-y-2 mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Studio Headshot Editor</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Create professional LinkedIn profile photos instantly.
                    </p>
                </div>

                {step === 'upload' && (
                    <div className="max-w-xl mx-auto transition-all">
                        <ImageDropzone onImageSelect={onSelectFile} description="Upload a selfie (We'll cut out the background)" />
                    </div>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-20 gap-6">
                        <Loader2 className="h-16 w-16 animate-spin text-primary" />
                        <p className="text-lg font-medium text-muted-foreground animate-pulse text-center">{status}</p>
                    </div>
                )}

                {step === 'editor' && (
                    <div className="grid lg:grid-cols-[1fr_380px] gap-8 select-none">

                        {/* Canvas */}
                        <div className="bg-secondary/10 rounded-3xl border border-border/50 relative flex items-center justify-center shadow-inner py-10 min-h-[600px]">
                            {/* Paper */}
                            <div className="relative w-[320px] h-[400px] bg-white shadow-2xl rounded-sm overflow-hidden ring-1 ring-black/5" id="canvas-area">

                                {/* 1. Suit Layer (Now Draggable too!) */}
                                <Rnd
                                    size={{ width: suitState.width, height: suitState.height }}
                                    position={{ x: suitState.x, y: suitState.y }}
                                    onDragStop={(e, d) => setSuitState(p => ({ ...p, x: d.x, y: d.y }))}
                                    onResizeStop={(e, dir, ref, d, pos) => {
                                        setSuitState(p => ({
                                            ...p,
                                            width: parseInt(ref.style.width),
                                            height: parseInt(ref.style.height),
                                            ...pos,
                                        }));
                                    }}
                                    className={`z-10 ${activeLayer === 'suit' ? 'ring-2 ring-primary/50' : ''}`}
                                    // Click to select layer
                                    onClick={() => setActiveLayer('suit')}
                                    lockAspectRatio={false}
                                    bounds="parent"
                                >
                                    <img
                                        src={selectedSuit.src}
                                        className="w-full h-full object-contain pointer-events-none"
                                        style={{ filter: `brightness(${suitState.brightness}%)` }}
                                    />
                                </Rnd>

                                {/* 2. Head Layer */}
                                <Rnd
                                    size={{ width: headState.width, height: headState.height }}
                                    position={{ x: headState.x, y: headState.y }}
                                    onDragStop={(e, d) => setHeadState(p => ({ ...p, x: d.x, y: d.y }))}
                                    onResizeStop={(e, dir, ref, d, pos) => {
                                        setHeadState(p => ({
                                            ...p,
                                            width: parseInt(ref.style.width),
                                            height: parseInt(ref.style.height),
                                            ...pos,
                                        }));
                                    }}
                                    lockAspectRatio={true}
                                    className={`z-20 ${activeLayer === 'head' ? 'ring-2 ring-primary/50' : ''}`}
                                    onClick={() => setActiveLayer('head')}
                                    bounds="parent"
                                >
                                    <div
                                        className="w-full h-full relative"
                                        style={{
                                            transform: `rotate(${headState.rotation}deg) scaleX(${headState.flip ? -1 : 1})`,
                                            filter: `brightness(${headState.brightness}%) contrast(${headState.contrast}%)`
                                        }}
                                    >
                                        <img src={headImg} className="w-full h-full object-contain drop-shadow-md pointer-events-none" />
                                    </div>
                                </Rnd>
                            </div>

                            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-muted-foreground pointer-events-none">
                                Tip: Click on the Face or Suit to move/resize it independently.
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="bg-card border border-border rounded-3xl p-6 shadow-xl flex flex-col gap-6 h-[600px] overflow-y-auto">

                            {/* Layer Selector */}
                            <div className="grid grid-cols-2 p-1 bg-secondary rounded-lg">
                                <button
                                    onClick={() => setActiveLayer('head')}
                                    className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${activeLayer === 'head' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                                >
                                    <User className="inline h-4 w-4 mr-2" />
                                    Edit Face
                                </button>
                                <button
                                    onClick={() => setActiveLayer('suit')}
                                    className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${activeLayer === 'suit' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                                >
                                    <Shirt className="inline h-4 w-4 mr-2" />
                                    Edit Suit
                                </button>
                            </div>

                            {activeLayer === 'suit' && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Choose Style</span>
                                        <div className="grid grid-cols-3 gap-3">
                                            {SUIT_ASSETS.map(s => (
                                                <button
                                                    key={s.id}
                                                    onClick={() => setSelectedSuit(s)}
                                                    className={`p-2 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-2 ${selectedSuit.id === s.id ? 'border-primary bg-primary/5' : 'border-border bg-secondary/50'}`}
                                                >
                                                    <div className="h-12 w-12 rounded-lg bg-white p-1 overflow-hidden shadow-sm">
                                                        <img src={s.src} className="w-full h-full object-contain" />
                                                    </div>
                                                    <span className="text-[10px] font-medium truncate w-full text-center">{s.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Suit Adjustments</span>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="flex-1" onClick={() => setSuitState(p => ({ ...p, width: p.width * 1.1, height: p.height * 1.1 }))}>
                                                <ZoomIn className="h-4 w-4 mr-2" /> Enlarge
                                            </Button>
                                            <Button variant="outline" size="sm" className="flex-1" onClick={() => setSuitState(p => ({ ...p, width: p.width * 0.9, height: p.height * 0.9 }))}>
                                                <ZoomOut className="h-4 w-4 mr-2" /> Shrink
                                            </Button>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="flex items-center gap-1"><Sun className="h-3 w-3" /> Suit Brightness</span>
                                            </div>
                                            <input
                                                type="range" min="50" max="150"
                                                value={suitState.brightness}
                                                onChange={(e) => setSuitState(p => ({ ...p, brightness: parseInt(e.target.value) }))}
                                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeLayer === 'head' && (
                                <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
                                    <div className="space-y-4">
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Face Adjustments</span>

                                        <div className="grid grid-cols-2 gap-2">
                                            <Button variant="outline" size="sm" onClick={() => setHeadState(p => ({ ...p, rotation: p.rotation - 90 }))}>
                                                <RotateCw className="h-4 w-4 mr-2" /> Rotate
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => setHeadState(p => ({ ...p, flip: !p.flip }))}>
                                                <Undo className="h-4 w-4 mr-2" /> Flip
                                            </Button>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="flex items-center gap-1"><Sun className="h-3 w-3" /> Face Brightness</span>
                                            </div>
                                            <input
                                                type="range" min="50" max="150"
                                                value={headState.brightness}
                                                onChange={(e) => setHeadState(p => ({ ...p, brightness: parseInt(e.target.value) }))}
                                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="flex items-center gap-1"><Contrast className="h-3 w-3" /> Face Contrast</span>
                                            </div>
                                            <input
                                                type="range" min="50" max="150"
                                                value={headState.contrast}
                                                onChange={(e) => setHeadState(p => ({ ...p, contrast: parseInt(e.target.value) }))}
                                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-border">
                                            <p className="text-xs text-muted-foreground">
                                                Use your mouse to drag and resize the face directly on the canvas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-auto pt-6 border-t border-border space-y-3">
                                <Button size="lg" className="w-full shadow-lg" onClick={onDownload}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Headshot
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => setStep('upload')}>
                                    <X className="h-4 w-4 mr-2" />
                                    Start Over
                                </Button>
                            </div>

                        </div>
                    </div>
                )}
                {/* SEO Content Section */}
                <div className="max-w-4xl mx-auto mt-20 prose prose-neutral dark:prose-invert">
                    <h2>Create Professional Headshots from Home (Free & Private)</h2>
                    <p>
                        You don't need a $200 photoshoot to look professional on LinkedIn.
                        <strong>UnitMaster Headshot Editor</strong> combines AI background removal with digital suit overlays to help you build a stunning profile picture in minutes.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                    <Accordion type="single" collapsible className="w-full not-prose">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How to take the best selfie for this tool?</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 text-muted-foreground">
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Lighting</strong>: Face a window. Natural light is best. Avoid harsh shadows.</li>
                                        <li><strong>Angle</strong>: Keep the camera at eye level. Don't look down at the phone.</li>
                                        <li><strong>Hair</strong>: Make sure your hair is neat. The AI will cut out the background, but it can't fix "bed head".</li>
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it really free?</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        Yes. This tool runs 100% in your browser. We don't have server costs for processing your images, so we don't charge you.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger>Privacy & Safety</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 text-muted-foreground">
                                    <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                                        <p className="text-sm font-medium text-foreground">
                                            🔒 Zero-Upload Policy: Your face data never leaves your device. The AI background remover runs locally (WASM) in Chrome/Firefox/Safari.
                                        </p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            mainEntity: [
                                {
                                    '@type': 'Question',
                                    name: 'How do I create a professional headshot at home?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'Take a well-lit selfie facing a window, upload it to our tool to remove the background, and add a professional suit overlay.'
                                    }
                                },
                                {
                                    '@type': 'Question',
                                    name: ' Is this headshot generator free?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'Yes, it is completely free and unlimited because it processes everything offline in your web browser.'
                                    }
                                },
                                {
                                    '@type': 'Question',
                                    name: 'Is my photo uploaded to the cloud?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'No. UnitMaster uses local AI (WebAssembly) to remove backgrounds directly on your device. Your photos remain 100% private.'
                                    }
                                }
                            ]
                        }),
                    }}
                />
            </div>
        </div>
    );
}
