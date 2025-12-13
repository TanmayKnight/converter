'use client';

import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { ImageDropzone } from '@/components/image-tools/ImageDropzone';
import { Button } from '@/components/ui/button';
// Removed: Select imports
import { Download, RefreshCw, X, FileImage } from 'lucide-react';

export default function ImageConverterPage() {
    const [imgSrc, setImgSrc] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [targetFormat, setTargetFormat] = useState('image/jpeg');
    const [processing, setProcessing] = useState(false);

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

            {!imgSrc ? (
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
            )}

            {/* SEO Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none mt-12 bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Image Formats Explained: JPG vs PNG vs WebP</h2>
                <p>
                    Choosing the right image format is crucial for web performance and visual quality.
                    <strong>UnitMaster Converter</strong> lets you switch between them instantly. Here is how to choose:
                </p>

                <h3>JPG / JPEG (Joint Photographic Experts Group)</h3>
                <p>
                    <strong>Best for:</strong> Photographs, portraits, and complex scenery.
                </p>
                <ul>
                    <li><strong>Pros</strong>: Small file size. Universal compatibility.</li>
                    <li><strong>Cons</strong>: "Lossy" compression (quality degrades with each save). No transparency support.</li>
                </ul>

                <h3>PNG (Portable Network Graphics)</h3>
                <p>
                    <strong>Best for:</strong> Logos, screenshots, icons, and text-heavy images.
                </p>
                <ul>
                    <li><strong>Pros</strong>: "Lossless" quality (crisp edges). Supports Transparency (alpha channel).</li>
                    <li><strong>Cons</strong>: Larger file sizes, especially for photos.</li>
                </ul>

                <h3>WebP (Google's Web Format)</h3>
                <p>
                    <strong>Best for:</strong> Modern websites and apps.
                </p>
                <ul>
                    <li><strong>Pros</strong>: The best of both worlds. 25-35% smaller than JPGs with the same quality. Supports transparency.</li>
                    <li><strong>Cons</strong>: Not supported by very old browsers (Internet Explorer), but works on all modern devices.</li>
                </ul>

                <h3>Optimization Tip</h3>
                <p>
                    If you are building a website, convert your heavy PNG headers to WebP. You will see a significant boost in your PageSpeed Insights score.
                </p>
            </div>
        </div>
    );
}
