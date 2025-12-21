'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { ImageDropzone } from '@/components/image-tools/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Download, X, Globe, User, CheckCircle2, Lock, Crown, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePro } from '@/hooks/usePro';


// Passport Standards Database
const PASSPORT_STANDARDS = [
    { id: 'us', name: 'United States', dimensions: '2x2 inch', width: 600, height: 600, aspect: 1, guide: "Head must constitute 50-69% of image height." },
    { id: 'uk', name: 'United Kingdom', dimensions: '35x45 mm', width: 827, height: 1063, aspect: 35 / 45, guide: "Head height between 29mm and 34mm." },
    { id: 'in', name: 'India', dimensions: '2x2 inch', width: 600, height: 600, aspect: 1, guide: "Head centered, full face visible." },
    { id: 'schengen', name: 'Schengen (EU)', dimensions: '35x45 mm', width: 827, height: 1063, aspect: 35 / 45, guide: "Face covers 70-80% of photo." },
    { id: 'ca', name: 'Canada', dimensions: '50x70 mm', width: 591, height: 827, aspect: 50 / 70, guide: "Face centered 31-36mm." },
    { id: 'au', name: 'Australia', dimensions: '35x45 mm', width: 827, height: 1063, aspect: 35 / 45, guide: "Head size 32-36mm." },
];

export default function PassportPhotoPage() {
    const { isPro } = usePro();
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [standardId, setStandardId] = useState('us');

    const currentStandard = PASSPORT_STANDARDS.find(s => s.id === standardId) || PASSPORT_STANDARDS[0];

    // Select image
    function onSelectFile(file: File) {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
        reader.readAsDataURL(file);
    }

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Helper to create image from URL
    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    // Helper to get cropped image
    async function getCroppedImg(
        imageSrc: string,
        pixelCrop: Area,
        width: number,
        height: number,
        isOfficial: boolean
    ): Promise<string> {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return '';
        }

        // Draw the image rotated onto a temporary canvas if needed (simplification: strict crop)
        // For passport photos, we want strict dimensions.
        canvas.width = width;
        canvas.height = height;

        // White Background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // High Quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        /* 
           react-easy-crop returns pixelCrop relative to the rotated image provided. 
           But if functionality is simple pan/zoom, we can draw directly.
           If we support rotation, we need more complex logic. 
           For this snippet, we assume 0 rotation or simple crop extraction.
        */

        // Draw the cropped portion to the new canvas
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            width,
            height
        );

        if (!isOfficial) {
            // Add Watermark
            ctx.save();
            ctx.translate(width / 2, height / 2);
            ctx.rotate(-Math.PI / 4);
            ctx.font = `bold ${width / 10}px sans-serif`;
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('UnitMaster Preview', 0, 0);
            ctx.fillText('UnitMaster Preview', 0, height / 3);
            ctx.fillText('UnitMaster Preview', 0, -height / 3);
            ctx.restore();
        }

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                resolve(url);
            }, 'image/jpeg', 0.95);
        });
    }

    async function onDownloadClick(isOfficial: boolean) {
        if (isOfficial && !isPro) {
            window.location.href = '/pricing';
            return;
        }

        // Need the image source (not just the ref, which might be the rendered one) logic handled by getCroppedImg
        if (!imgSrc || !croppedAreaPixels) return;

        try {
            const croppedImageUrl = await getCroppedImg(
                imgSrc,
                croppedAreaPixels, // Pass pixels directly (already natural scale)
                currentStandard.width,
                currentStandard.height,
                isOfficial
            );

            const anchor = document.createElement('a');
            anchor.download = `passport-photo-${currentStandard.id}${!isOfficial ? '-preview' : ''}.jpg`;
            anchor.href = croppedImageUrl;
            anchor.click();
            URL.revokeObjectURL(croppedImageUrl);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Passport Photo Maker</h1>
                <p className="text-muted-foreground">Create compliant passport, visa, and ID photos for any country.</p>
            </div>

            {/* Stepper / Instructions */}
            {!imgSrc && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
                    {[
                        { title: "1. Upload", desc: "Use a photo with even lighting." },
                        { title: "2. Select Country", desc: "We set the correct size." },
                        { title: "3. Align", desc: "Fit face in the guide." }
                    ].map((step, i) => (
                        <div key={i} className="bg-secondary/10 p-4 rounded-xl border border-border/50 text-center">
                            <div className="font-bold text-lg mb-1">{step.title}</div>
                            <div className="text-sm text-muted-foreground">{step.desc}</div>
                        </div>
                    ))}
                </div>
            )}

            {!imgSrc ? (
                <ImageDropzone onImageSelect={onSelectFile} description="Upload a selfie or portrait (White background preferred)" />
            ) : (
                <div className="grid lg:grid-cols-[300px_1fr] gap-8 max-w-6xl mx-auto">
                    {/* Sidebar: Controls */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border p-5 rounded-xl space-y-4 shadow-sm">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                Target Country
                            </h3>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Select Standard</label>
                                <select
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    value={standardId}
                                    onChange={(e) => setStandardId(e.target.value)}
                                >
                                    {PASSPORT_STANDARDS.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name} ({s.dimensions})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Alert className="bg-blue-500/5 border-blue-500/20">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <AlertTitle className="text-blue-600 dark:text-blue-400 font-medium text-xs mb-1"> Requirement </AlertTitle>
                                <AlertDescription className="text-xs text-muted-foreground">
                                    {currentStandard.guide}
                                </AlertDescription>
                            </Alert>

                            {/* Zoom Control */}
                            <div className="space-y-3 pt-4 border-t border-border/50">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="flex items-center gap-1"><ZoomOut className="h-3 w-3" /> Zoom</span>
                                    <span>{Math.round(zoom * 100)}%</span>
                                </div>
                                <Slider
                                    value={[zoom]}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    onValueChange={(vals) => setZoom(vals[0])}
                                />
                            </div>

                            <div className="pt-4 border-t border-border/50 space-y-2">
                                <Button onClick={() => onDownloadClick(false)} className="w-full" variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Preview {isPro ? '(Watermarked)' : '(Free)'}
                                </Button>
                                <Button onClick={() => onDownloadClick(true)} className={`w-full ${!isPro ? 'opacity-90' : 'bg-emerald-600 hover:bg-emerald-700'}`} size="lg">
                                    {!isPro ? <Lock className="h-4 w-4 mr-2 text-amber-200" /> : <Crown className="h-4 w-4 mr-2 text-yellow-300" />}
                                    Download Official Photo
                                </Button>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setImgSrc('')} className="w-full mt-2">
                                <X className="h-4 w-4 mr-2" />
                                Start Over
                            </Button>
                        </div>
                    </div>

                    {/* Main Area: Cropper */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Align your Photo
                            </h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-secondary text-foreground">
                                Aspect Ratio: {currentStandard.aspect < 1 ? 'Portrait' : 'Square'}
                            </span>
                        </div>

                        {/* Relative container for Cropper */}
                        <div className="relative w-full h-[500px] bg-secondary/10 rounded-lg overflow-hidden border border-border/50">
                            <Cropper
                                image={imgSrc}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={currentStandard.aspect}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                showGrid={false}
                                objectFit="contain"
                            />

                            {/* Static Overlay for Face Alignment */}
                            {/* Uses pointer-events-none so drags pass through to Cropper */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                {/* The crop area is centered by default in react-easy-crop.
                                    We need to approximate the visual guide. 
                                    Currently, we'll center it relative to the viewport. 
                                    Ideally, we would sync this with the crop size, but react-easy-crop manages that.
                                    However, since we are using objectFit="contain" and the crop box is centered...
                                    Actually, react-easy-crop has a semi-transparent mask. We just need the LINES.
                                */}
                                <div
                                    className="border-2 border-white/50 border-dashed rounded-full shadow-sm"
                                    style={{
                                        // Approximate the visual size of the crop area for the face guide.
                                        // This is a bit tricky without knowing exact rendered crop dimensions.
                                        // But for a simple UX, a centered static guide is usually "good enough" if the user centers the crop.
                                        // Or better, we let react-easy-crop handle the mask, and we just provide the guidelines.
                                        // Let's create a generic SVG overlay that looks like a head outline.
                                        width: '200px',
                                        height: '260px',
                                        opacity: 0.7
                                    }}
                                >
                                    {/* Inner face oval */}
                                    {/* Just using the div border as the head guide for now, simple and effective. */}
                                </div>
                                <svg viewBox="0 0 100 100" className="absolute w-[300px] h-[300px] text-white opacity-50 drop-shadow-md">
                                    {/* Shoulder Guide */}
                                    <path d="M 10 100 Q 50 60 90 100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
                                </svg>
                            </div>
                        </div>

                        <p className="text-center text-xs text-muted-foreground mt-4">
                            Drag the image to position. Use the slider to zoom.
                        </p>
                    </div>
                </div>
            )
            }


            {/* SEO Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none mt-12 bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>The Ultimate Guide to DIY Passport Photos</h2>
                <p>
                    Why pay $15 at a drug store for a grainy photo? With a smartphone and <strong>UnitMaster</strong>, you can take a compliant passport photo at home for free.
                    However, governments are strict. A rejected photo means a rejected application. Follow these rules carefully.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What are the critical requirements (US & EU)?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Background</strong>: Must be plain white or off-white. No patterns, no shadows. Use a white sheet or wall.</li>
                                    <li><strong>Lighting</strong>: Even lighting is key. Face a window to get natural light. Avoid side lighting which creates shadows on one side of the face.</li>
                                    <li><strong>Expression</strong>: Neutral expression. Both eyes open. Mouth closed. No smiling (for most countries).</li>
                                    <li><strong>Attire</strong>: Wear normal daily clothes. No uniforms. No camouflage. No hats (unless for religious purposes). Glasses are now banned in US passport photos.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>How to compose the perfect shot?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>The "Biometric Standard" requires specific proportions:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>The "Eye Line"</strong>: Your eyes must be in the top third of the photo.</li>
                                    <li><strong>Head Size</strong>: Your head must take up roughly 60-70% of the total height. Too far away? Rejected. Too close? Rejected.</li>
                                </ul>
                                <p>
                                    Our tool handles the cropping and aspect ratio (2x2 inch for US, 35x45mm for UK/EU) automatically, but you must provide a good source image.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can I print this at home?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Yes. Once you download your 2x2 inch image, you can print it on a standard 4x6 inch photo paper (you can fit 2 photos side-by-side).
                                    Do not print on regular copy paper; use glossy or matte photo quality paper.
                                </p>
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
                                name: 'Can I take my own passport photo?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, provided you follow the strict requirements for lighting, background (white), and composition. Our tool helps crop it to the exact legal dimensions.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: ' What is the size for a US passport photo?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'A US passport photo must be exactly 2x2 inches (51x51 mm). The head must be between 1 and 1 3/8 inches from the bottom of the chin to the top of the head.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Can I wear glasses in my passport photo?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No. As of 2016, you cannot wear glasses in a US passport photo. You must remove them to avoid glare and ensure your eyes are fully visible.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </div >
    );
}
