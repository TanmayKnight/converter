'use client';

import React, { useState } from 'react';
import { removeBackground } from '@imgly/background-removal';
import { ImageDropzone } from '@/components/image-tools/ImageDropzone';
import { Button } from '@/components/ui/button';
import { usePro } from '@/hooks/usePro';
import { Loader2, Download, AlertTriangle, Layers, X, Crown, Lock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export default function RemoveBackgroundClient() {
    const { isPro } = usePro();
    const [originalSrc, setOriginalSrc] = useState<string>('');
    const [processedSrc, setProcessedSrc] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [status, setStatus] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Select image
    function onSelectFile(file: File) {
        setOriginalSrc('');
        setProcessedSrc('');
        setError('');

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const src = reader.result?.toString() || '';
            setOriginalSrc(src);
            processImage(src);
        });
        reader.readAsDataURL(file);
    }

    async function processImage(imageSrc: string) {
        setIsProcessing(true);
        setStatus('Initializing AI Model (This runs in your browser)...');

        try {
            // Processing
            // The library fetches WASM/ONNX files from Unpkg/JSDelivr by default
            const imageBlob = await removeBackground(imageSrc, {
                progress: (key: string, current: number, total: number) => {
                    const percent = Math.round((current / total) * 100);
                    setStatus(`Processing: ${key} (${percent}%)`);
                }
            });

            const url = URL.createObjectURL(imageBlob);
            setProcessedSrc(url);
            setStatus('Completed!');
        } catch (err: any) {
            console.error(err);
            setError('Failed to remove background. Please try a simpler image or check your connection (required for initial model download).');
        } finally {
            setIsProcessing(false);
        }
    }

    function onDownload(quality: 'hd' | 'standard') {
        if (!processedSrc) return;

        if (quality === 'hd' && !isPro) {
            window.location.href = '/pricing';
            return;
        }

        if (quality === 'standard' && !isPro) {
            // Downscale for free users
            const img = new Image();
            img.src = processedSrc;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_SIZE = 800; // Free limit
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    }
                } else {
                    if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/png');
                const anchor = document.createElement('a');
                anchor.download = 'transparent-standard-unitmaster.png';
                anchor.href = dataUrl;
                anchor.click();
            };
            return;
        }

        // Pro or Original
        const anchor = document.createElement('a');
        anchor.download = 'transparent-hd-unitmaster.png';
        anchor.href = processedSrc;
        anchor.click();
    }

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Remove Background</h1>
                <p className="text-muted-foreground">Instantly remove image backgrounds using local technology. 100% Free & Private.</p>
            </div>

            {!originalSrc ? (
                <ImageDropzone onImageSelect={onSelectFile} description="Upload an image to automatically remove the background" />
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Original */}
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm h-fit">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-muted-foreground">Original</span>
                            <Button variant="ghost" size="sm" onClick={() => setOriginalSrc('')} disabled={isProcessing}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="relative aspect-square bg-secondary/20 rounded-lg overflow-hidden flex items-center justify-center">
                            <img src={originalSrc} alt="Original" className="max-w-full max-h-full object-contain" />
                        </div>
                    </div>

                    {/* Processed */}
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm h-fit">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-muted-foreground">Result</span>
                            {processedSrc && (
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" onClick={() => onDownload('standard')} className="text-xs h-8">
                                        <Download className="h-3 w-3 mr-1.5" />
                                        Standard {isPro ? '(Fast)' : '(Free)'}
                                    </Button>
                                    <Button size="sm" onClick={() => onDownload('hd')} className={`text-xs h-8 ${!isPro ? 'opacity-90' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}>
                                        {!isPro ? <Lock className="h-3 w-3 mr-1.5 text-amber-200" /> : <Crown className="h-3 w-3 mr-1.5 text-yellow-300" />}
                                        Download HD
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="relative aspect-square bg-[url('/transparent-grid.svg')] bg-center rounded-lg overflow-hidden flex items-center justify-center border border-dashed border-border/50">
                            {/* Checkered pattern CSS fallback if svg missing */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
                            </div>

                            {isProcessing ? (
                                <div className="text-center space-y-4 p-6">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                                    <p className="text-sm font-medium animate-pulse">{status}</p>
                                </div>
                            ) : error ? (
                                <div className="text-center p-6 text-destructive">
                                    <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                                    <p className="text-sm">{error}</p>
                                    <Button variant="outline" size="sm" className="mt-4" onClick={() => setOriginalSrc('')}>Try Another</Button>
                                </div>
                            ) : (
                                <img src={processedSrc} alt="Processed" className="max-w-full max-h-full object-contain relative z-10" />
                            )}
                        </div>

                        {processedSrc && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <Layers className="h-3 w-3" />
                                <span>Background is transparent</span>
                            </div>
                        )}
                    </div>
                </div>
            )}



            {/* SEO Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none mt-12 bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Free Background Remover</h2>
                <p>
                    Manually cutting out an object from a photo using Photoshop&apos;s lasso tool used to take hours of tedious clicking.
                    <strong>UnitMaster</strong> changes the game. We use state-of-the-art machine learning models to instantly detect the subject of your photo—whether it&apos;s a person, car, or product—and surgically remove the background.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does it work in the browser?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Introduction</strong>: U-2-Net is a deep network architecture designed for salient object detection (SOD). It&apos;s capable of separating the main object from the background with high precision.</li>
                                    <li><strong>Architecture</strong>: It consists of a two-level nested U-structure. This allows it to capture more contextual information from different scales without significantly increasing the computational cost.</li>
                                    <li><strong>Training</strong>: The model is trained on DUTS-TR, a large dataset for salient object detection.</li>
                                    <li><strong>Performance</strong>: U-2-Net achieves competitive performance on SOD benchmarks while maintaining a small model size (176.3 MB for the full model, and significantly less for the quantized version used here).</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why is it better for E-Commerce?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Consistency</strong>: Make all your product shots look uniform with white/transparent backgrounds.</li>
                                    <li><strong>Focus</strong>: Remove distracting messy rooms or outdoor backgrounds.</li>
                                    <li><strong>Marketing</strong>: Easily overlay your product onto promotional banners.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Tips for the best results?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li><strong>Contrast is Key</strong>: The tool works best when the subject stands out from the background (e.g., a dark product on a light table).</li>
                                    <li><strong>Good Lighting</strong>: Avoid heavy shadows crossing over the subject.</li>
                                    <li><strong>Focus</strong>: Ensure the subject is sharp. Blurry edges can lead to a &quot;soft&quot; cutout.</li>
                                </ol>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>Is it really free and unlimited?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Yes. Because you are using your own computer&apos;s processing power, we don&apos;t need expensive servers.
                                    We pass those savings to you by offering this tool for free, with no daily limits and no watermarks.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
