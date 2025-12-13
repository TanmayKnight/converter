'use client';

import React, { useState } from 'react';
import { removeBackground } from '@imgly/background-removal';
import { ImageDropzone } from '@/components/image-tools/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Loader2, Download, AlertTriangle, Layers, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function RemoveBackgroundPage() {
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

    function onDownload() {
        if (!processedSrc) return;
        const anchor = document.createElement('a');
        anchor.download = 'transparent-background.png';
        anchor.href = processedSrc;
        anchor.click();
    }

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Remove Background AI</h1>
                <p className="text-muted-foreground">Instantly remove image backgrounds using local AI. 100% Free & Private.</p>
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
                                <Button size="sm" onClick={onDownload} className="text-xs">
                                    <Download className="h-3 w-3 mr-1.5" />
                                    Download PNG
                                </Button>
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
                <h2>Free AI Background Remover</h2>
                <p>
                    Manually cutting out an object from a photo using Photoshop's lasso tool used to take hours of tedious clicking.
                    <strong>UnitMaster AI</strong> changes the game. We use state-of-the-art machine learning models to instantly detect the subject of your photo—whether it's a person, car, or product—and surgically remove the background.
                </p>

                <h3>How It Works (The Tech)</h3>
                <p>
                    This tool runs a neural network called <strong>U-2-Net</strong> directly inside your web browser.
                    Traditionally, AI this powerful required expensive GPU servers in the cloud.
                    We have optimized these models to run on <strong>WebAssembly (WASM)</strong>, essentially turning your browser into a mini AI supercomputer.
                </p>
                <p>
                    <strong>The Result:</strong> You get professional-grade "Magic Wand" functionality without ever sending your photo to a third party.
                </p>

                <h3>Perfect for E-Commerce</h3>
                <p>
                    Online marketplaces like Amazon, eBay, and Shopify require product photos to have a pure white (or transparent) background.
                </p>
                <ul>
                    <li><strong>Consistency</strong>: Make all your product shots look uniform.</li>
                    <li><strong>Focus</strong>: Remove distracting messy rooms or outdoor backgrounds.</li>
                    <li><strong>Marketing</strong>: Easily overlay your product onto promotional banners or ad creatives.</li>
                </ul>

                <h3>Tips for Best Results</h3>
                <ol>
                    <li><strong>Contrast is Key</strong>: The AI works best when the subject stands out from the background (e.g., a dark product on a light table).</li>
                    <li><strong>Good Lighting</strong>: Avoid heavy shadows crossing over the subject, as the AI might mistake a shadow for part of the object.</li>
                    <li><strong>Focus</strong>: Ensure the subject is sharp. Blurry edges can lead to a "soft" cutout.</li>
                </ol>

                <h3>100% Free & Unlimited</h3>
                <p>
                    Most background remover sites charge you "credits" per image or only let you download a low-res preview for free.
                    <strong>UnitMaster is different.</strong> Because you are using your own computer's processing power, we don't have to pay for expensive servers.
                    That means we can offer this tool for free, with no daily limits and no watermarks.
                </p>
            </div>
        </div>
    );
}
