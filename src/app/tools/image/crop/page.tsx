'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ImageDropzone } from '@/components/image-tools/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'Image Cropper',
                        applicationCategory: 'PhotographyApplication',
                        operatingSystem: 'Any',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                        description: 'Free online image cropper tool. Crop and resize images for social media directly in the browser.',
                    })
                }}
            />
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
            <div className="prose prose-neutral dark:prose-invert max-w-none mt-12 bg-secondary/10 p-8 rounded-2xl border border-border/50 text-left">
                <h2>Guide to Image Cropping and Aspect Ratios</h2>
                <p>
                    Cropping is one of the most fundamental photo editing techniques. It allows you to improve framing, remove distractions, and fit your image to specific dimensions.
                    The <strong>UnitMaster Image Cropper</strong> gives you pixel-perfect control over your photos without reducing their quality.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Which Aspect Ratio should I use?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>1:1 (Square)</strong>: Perfect for Instagram posts, Facebook profile pictures, and product thumbnails. It focuses the viewer's attention on the center of the frame.</li>
                                    <li><strong>16:9 (Widescreen)</strong>: The standard for YouTube thumbnails, Facebook cover photos, and modern screens. Use this for landscapes and banner images.</li>
                                    <li><strong>4:3 (Standard)</strong>: Common for digital cameras and retro-style photos. It offers a taller frame than 16:9.</li>
                                    <li><strong>9:16 (Vertical)</strong>: The native format for TikTok, Instagram Reels, and YouTube Shorts.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Professional Cropping Tips</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li><strong>Rule of Thirds</strong>: Imagine a 3x3 grid over your image. Try to place your subject along these lines or their intersections for a more balanced composition.</li>
                                    <li><strong>Leave Breathing Room</strong>: Don't crop too tightly. Leaving some space around your subject prevents the image from feeling claustrophobic.</li>
                                    <li><strong>Watch the Resolution</strong>: Cropping removes pixels. If you crop a small image too heavily, it may become pixelated. Start with the highest resolution image possible.</li>
                                </ol>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is my photo uploaded to a server?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    No. Unlike other tools that upload your photos to a cloud server, UnitMaster processes your edits <strong>locally in your browser</strong> using HTML5 Canvas technology.
                                </p>
                                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary my-2">
                                    <p className="text-sm font-medium text-foreground">
                                        🔒 Private & Fast: Your personal photos never leave your device, guaranteeing 100% privacy and zero upload waiting time.
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
                                name: 'What aspect ratio is best for Social Media?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'For Instagram posts and profile pictures, use 1:1 (Square). For YouTube thumbnails and cover photos, use 16:9. For TikTok and Reels, use 9:16.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: ' Does cropping reduce image quality?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Technically, cropping removes pixels, so the total resolution decreases. However, our tool ensures the remaining pixels are not compressed or degraded, preserving the original quality of the area you kept.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is this cropping tool secure?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. All image processing happens locally in your browser using HTML5 Canvas. Your photos are never uploaded to any server.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </div>
    );
}
