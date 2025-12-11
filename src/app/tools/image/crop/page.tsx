'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ImageDropzone } from '@/components/image-tools/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, X } from 'lucide-react';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function ImageCropperPage() {
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const imgRef = useRef<HTMLImageElement>(null);
    const [aspect, setAspect] = useState<number | undefined>(undefined);

    // Select image
    function onSelectFile(file: File) {
        setCrop(undefined); // Reset crop
        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
        reader.readAsDataURL(file);
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        } else {
            // Default to full center crop if no aspect
            const { width, height } = e.currentTarget;
            setCrop({
                unit: '%',
                width: 90,
                height: 90,
                x: 5,
                y: 5
            });
        }
    }

    async function onDownloadCropClick() {
        const image = imgRef.current;
        const previewCanvas = document.createElement('canvas');
        if (!image || !completedCrop) return;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const ctx = previewCanvas.getContext('2d');
        if (!ctx) return;

        const pixelRatio = window.devicePixelRatio;
        previewCanvas.width = completedCrop.width * pixelRatio * scaleX;
        previewCanvas.height = completedCrop.height * pixelRatio * scaleY;

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = 'high';

        const cropX = completedCrop.x * scaleX;
        const cropY = completedCrop.y * scaleY;
        const cropWidth = completedCrop.width * scaleX;
        const cropHeight = completedCrop.height * scaleY;

        ctx.drawImage(
            image,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight
        );

        previewCanvas.toBlob((blob) => {
            if (!blob) return;
            const previewUrl = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.download = 'cropped-image.png';
            anchor.href = previewUrl;
            anchor.click();
            URL.revokeObjectURL(previewUrl);
        }, 'image/png');
    }

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Image Cropper</h1>
                <p className="text-muted-foreground">Crop and resize images precisely for social media or print.</p>
            </div>

            {!imgSrc ? (
                <ImageDropzone onImageSelect={onSelectFile} />
            ) : (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-2 mb-6 pb-6 border-b border-border/50">
                        <Button variant="outline" size="sm" onClick={() => { setAspect(undefined); if (imgRef.current) onImageLoad({ currentTarget: imgRef.current } as any) }} className={!aspect ? "bg-primary/10 border-primary" : ""}>
                            Free
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => { setAspect(1); if (imgRef.current) onImageLoad({ currentTarget: imgRef.current } as any) }} className={aspect === 1 ? "bg-primary/10 border-primary" : ""}>
                            Square (1:1)
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => { setAspect(16 / 9); if (imgRef.current) onImageLoad({ currentTarget: imgRef.current } as any) }} className={aspect === 16 / 9 ? "bg-primary/10 border-primary" : ""}>
                            16:9
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => { setAspect(4 / 3); if (imgRef.current) onImageLoad({ currentTarget: imgRef.current } as any) }} className={aspect === 4 / 3 ? "bg-primary/10 border-primary" : ""}>
                            4:3
                        </Button>

                        <div className="ml-auto flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setImgSrc('')}>
                                <X className="h-4 w-4 mr-2" />
                                Clear
                            </Button>
                            <Button onClick={onDownloadCropClick}>
                                <Download className="h-4 w-4 mr-2" />
                                Download Crop
                            </Button>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="flex justify-center bg-secondary/20 rounded-lg p-4 overflow-auto max-h-[70vh]">
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}
                            className="max-w-full"
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                onLoad={onImageLoad}
                                className="max-w-full h-auto max-h-[60vh] object-contain"
                            />
                        </ReactCrop>
                    </div>
                </div>
            )}

            {/* SEO Content Section */}
            <div className="prose prose-neutral dark:prose-invert max-w-none mt-12 bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>How to Crop Images Online</h2>
                <p>
                    Our free online image cropper allows you to easily crop photos, remove unwanted parts, and adjust the aspect ratio for social media platforms like Instagram, Facebook, and Twitter.
                    No account required, and your images are processed entirely in your browser for maximum privacy.
                </p>
                <ul>
                    <li><strong>Upload</strong>: Drag and drop your JPG, PNG, or WebP image.</li>
                    <li><strong>Adjust</strong>: Select a preset (Square, 16:9) or drag the handles to crop freely.</li>
                    <li><strong>Download</strong>: Click "Download Crop" to save the high-quality result instantly.</li>
                </ul>
            </div>
        </div>
    );
}
