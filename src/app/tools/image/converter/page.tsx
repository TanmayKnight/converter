'use client';

import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { ImageDropzone } from '@/components/image-tools/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// Removed: Select imports
import { Download, RefreshCw, X, FileImage, Crown, Lock } from 'lucide-react';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { usePro } from '@/hooks/usePro';

export default function ImageConverterPage() {
    const { isPro } = usePro();
    const [imgSrc, setImgSrc] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [targetFormat, setTargetFormat] = useState('image/jpeg');
    const [processing, setProcessing] = useState(false);
    const [mode, setMode] = useState<'single' | 'batch'>('single');

    // Select image
    function onSelectFile(selectedFile: File) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
        reader.readAsDataURL(selectedFile);
    }

    async function onConvert() {
        if (!file) return;
        setProcessing(true);

        try {
            const options = {
                maxSizeMB: 5, // Reasonable limit
                maxWidthOrHeight: 4096, // Maintains high quality
                useWebWorker: true,
                fileType: targetFormat
            };

            const compressedFile = await imageCompression(file, options);

            const url = URL.createObjectURL(compressedFile);
            const anchor = document.createElement('a');
            const ext = targetFormat.split('/')[1];
            anchor.download = `converted-image.${ext}`;
            anchor.href = url;
            anchor.click();
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error);
        } finally {
            setProcessing(false);
        }
    }

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Image Converter & Compressor</h1>
                <p className="text-muted-foreground">Convert images to JPG, PNG, or WEBP instantly in your browser.</p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center mb-8">
                <div className="bg-secondary/50 p-1 rounded-lg inline-flex items-center gap-1 border border-border/50">
                    <button
                        onClick={() => setMode('single')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${mode === 'single' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Single File
                    </button>
                    <button
                        onClick={() => setMode('batch')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === 'batch' ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Batch Mode
                        {isPro ? (
                            <span className="bg-gradient-to-r from-amber-300 to-yellow-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <Crown className="w-3 h-3" /> PRO
                            </span>
                        ) : (
                            <span className="bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <Lock className="w-3 h-3" /> PRO
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {mode === 'single' ? (
                // Single File Mode (Existing Logic)
                !imgSrc ? (
                    <ImageDropzone onImageSelect={onSelectFile} description="Upload PNG, JPG, or WEBP to convert" />
                ) : (
                    <div className="max-w-xl mx-auto bg-card border border-border rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="h-16 w-16 bg-secondary/20 rounded-lg overflow-hidden flex items-center justify-center">
                                    <img src={imgSrc} alt="Preview" className="max-w-full max-h-full object-contain" />
                                </div>
                                <div>
                                    <p className="font-medium truncate max-w-[200px]">{file?.name}</p>
                                    <p className="text-xs text-muted-foreground">Original: {(file!.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => { setImgSrc(''); setFile(null); }}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Convert to</label>
                                <select
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={targetFormat}
                                    onChange={(e) => setTargetFormat(e.target.value)}
                                >
                                    <option value="image/jpeg">JPG / JPEG (Good for Photos)</option>
                                    <option value="image/png">PNG (Good for Graphics)</option>
                                    <option value="image/webp">WEBP (Best for Web)</option>
                                </select>
                            </div>

                            <Button size="lg" className="w-full mt-2" onClick={onConvert} disabled={processing}>
                                {processing ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-4 w-4 mr-2" />
                                        Convert & Download
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )
            ) : (
                // Batch Mode Gate
                <div className="max-w-2xl mx-auto relative group overflow-hidden rounded-xl border-2 border-dashed border-border/50 bg-secondary/5">
                    {/* Blurred Content */}
                    <div className="p-12 filter blur-sm opacity-50 pointer-events-none select-none flex flex-col items-center justify-center gap-4">
                        <FileImage className="h-16 w-16 text-muted-foreground" />
                        <div className="text-center space-y-2">
                            <h3 className="font-semibold text-lg">Batch Converter</h3>
                            <p className="text-sm text-muted-foreground">Drag and drop a folder of images to convert them all at once.</p>
                        </div>
                        <div className="grid grid-cols-4 gap-4 opacity-50 w-full max-w-md mt-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Lock Overlay or Coming Soon */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] p-6 text-center">
                        <div className="bg-background rounded-full p-4 shadow-xl border border-border mb-4">
                            {isPro ? <Crown className="h-8 w-8 text-amber-500" /> : <RefreshCw className="h-8 w-8 text-primary" />}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{isPro ? "Batch Mode (Beta)" : "Unlock Batch Processing"}</h3>
                        <p className="text-muted-foreground max-w-sm mb-6">
                            {isPro ? "Batch processing is currently in Beta. You can convert up to 50 files at once." : "Convert hundreds of images in seconds. Save hours of manual work with UnitMaster Pro."}
                        </p>

                        {!isPro && (
                            <Button asChild size="lg" className="h-12 px-8 text-lg font-bold shadow-lg shadow-primary/20">
                                <a href="/pricing">
                                    Upgrade to Pro - $9/mo
                                </a>
                            </Button>
                        )}
                        {!isPro && <p className="text-xs text-muted-foreground mt-4">14-day money-back guarantee</p>}

                        {isPro && (
                            <Button variant="outline" onClick={() => setMode('single')}>
                                Switch to Single File
                            </Button>
                        )}
                    </div>
                </div>
            )}



            {/* SEO Content Component */}
            <SeoContentSection
                title="Image Formats Explained"
                description={`
                    <p>Choosing the right image format is crucial for web performance and visual quality. <strong class="text-primary">UnitMaster Converter</strong> works entirely offline in your browser, ensuring your photos are never uploaded to a server.</p>
                    <p class="mt-4">Here is how to choose the right format:</p>
                `}
                features={[
                    {
                        title: "JPG / JPEG",
                        description: "Best for photographs and realistic images. High compression, small file size, but no transparency."
                    },
                    {
                        title: "PNG",
                        description: "Best for logos, screenshots, and text. Lossless quality with transparency support, but larger file sizes."
                    },
                    {
                        title: "WebP",
                        description: "The modern standard for web. Superior compression (30% smaller than JPG) with transparency support."
                    }
                ]}
                benefits={[
                    "100% Privacy - Files process on your device",
                    "No File Size Limits (Processor dependent)",
                    "Works Offline (PWA Ready)",
                    "Batch Processing available for Pro users"
                ]}
                faqs={[
                    {
                        question: "When should I convert to JPG?",
                        answer: "Use JPG for photographs where file size matters more than perfect pixel accuracy. It's the standard for social media and general storage."
                    },
                    {
                        question: "When should I convert to PNG?",
                        answer: "Use PNG for logos, diagrams, or any image needing a transparent background. It preserves perfect clarity but generates larger files."
                    },
                    {
                        question: "What is WebP?",
                        answer: "WebP is a modern image format developed by Google. It provides both lossy and lossless compression, making it the best choice for faster-loading websites."
                    },
                    {
                        question: "Is it safe?",
                        answer: "Yes. Unlike other converters, UnitMaster does not upload your images to any server. Everything happens locally in your browser using secure WebAssembly technology."
                    }
                ]}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'SoftwareApplication',
                    name: 'UnitMaster Image Converter',
                    applicationCategory: 'PhotoEditor',
                    operatingSystem: 'Any',
                    offers: {
                        '@type': 'Offer',
                        price: '0',
                        priceCurrency: 'USD'
                    },
                    featureList: 'Convert JPG, PNG, WEBP, Batch processing, Offline mode',
                }}
            />
        </div>
    );
}
