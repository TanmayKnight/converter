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
                <h2>Free Background Remover</h2>
                <p>
                    Remove backgrounds from images instantly for free. Our tool uses advanced AI that runs directly in your browser. This means your images are **never uploaded to a server**, guaranteeing 100% privacy.
                </p>
                <h3>Why use our tool?</h3>
                <ul>
                    <li><strong>Privacy First</strong>: All processing happens on your device.</li>
                    <li><strong>Unlimited</strong>: No credits, no daily limits.</li>
                    <li><strong>High Quality</strong>: Handles hair and fine details with precision.</li>
                </ul>
            </div>
        </div>
    );
}
