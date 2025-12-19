'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Search, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { usePro } from '@/hooks/usePro';
import { ProGate } from '@/components/ui/pro-gate';


export default function ThumbnailClient() {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showPaywall, setShowPaywall] = useState(false);

    // Schema for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster Thumbnail Grabber',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: 'YouTube Thumbnail Download, MaxRes Quality, HD Quality',
        description: 'Free online YouTube thumbnail downloader. Get high-quality thumbnails from any video instantly.',
    };

    const extractId = () => {
        if (!url.trim()) return;

        // Regex for YouTube IDs
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[7].length === 11) {
            setVideoId(match[7]);
            setError(null);
            toast.success("Video found!");
        } else {
            setError("Invalid YouTube URL. Please check the link.");
            setVideoId(null);
        }
    };

    const { isPro, isLoading: isProLoading } = usePro();

    const downloadImage = async (quality: string, forceWatermark = false) => {
        if (!videoId) return;

        // Check Pro status loaded
        if (isProLoading) {
            toast.loading("Verifying subscription...");
            return;
        }

        // Check Pro Gate first (Only for MaxRes)
        if (quality === 'maxresdefault' && !isPro && !forceWatermark) {
            setShowPaywall(true);
            return;
        }

        const imageUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
        const fileName = `thumbnail_${videoId}_${quality}.jpg`;

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            // Add Watermark if not Pro (Only for MaxRes)
            if (!isPro && quality === 'maxresdefault') {
                const watermarkText = "UnitMaster.io";
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();

                // Create object URL from blob to avoid CORS on canvas draw (since we already fetched successfully)
                const imgUrl = URL.createObjectURL(blob);

                await new Promise((resolve, reject) => {
                    img.onload = () => resolve(true);
                    img.onerror = reject;
                    img.src = imgUrl;
                });

                canvas.width = img.width;
                canvas.height = img.height;

                if (ctx) {
                    ctx.drawImage(img, 0, 0);

                    // Add semi-transparent overlay at bottom
                    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

                    // Add Text
                    ctx.font = "bold 30px sans-serif";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "right";
                    ctx.fillText(watermarkText, canvas.width - 20, canvas.height - 20);
                }

                // Convert back to blob
                const watermarkedBlob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));

                if (watermarkedBlob) {
                    const url = window.URL.createObjectURL(watermarkedBlob);
                    triggerDownload(url, fileName);
                    window.URL.revokeObjectURL(url);
                    window.URL.revokeObjectURL(imgUrl); // Clean up original
                    toast.success("Downloaded (Watermarked). Upgrade to Pro to remove.");
                }
                setShowPaywall(false);
                return;
            }

            // Pro User: Download Original
            const blobUrl = window.URL.createObjectURL(blob);
            triggerDownload(blobUrl, fileName);
            window.URL.revokeObjectURL(blobUrl);
            toast.success("Download started");

        } catch (err) {
            console.error(err);
            // Fallback: Open in new tab if CORS fails (though it shouldn't for img.youtube.com)
            window.open(imageUrl, '_blank');
            toast.info("Opened in new tab (Right click to save)");
        }
    };

    const triggerDownload = (url: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-bold text-foreground">
                    YouTube Thumbnail Grabber
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Download high-quality thumbnails from any YouTube video.
                </p>
            </div>

            {/* Input Section - Mimicking ImageDropzone style */}
            {!videoId && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-card border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors rounded-xl p-10 flex flex-col items-center justify-center space-y-6">
                        <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-2 text-center">
                            <h3 className="font-semibold text-lg">Paste Video URL</h3>
                            <p className="text-sm text-muted-foreground">
                                Paste a YouTube link to instantly extract high-quality thumbnails.
                            </p>
                        </div>

                        <div className="flex gap-2 w-full max-w-md mt-4">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && extractId()}
                                placeholder="https://youtu.be/..."
                                className="flex-1 h-10 px-4 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:outline-none transition-all text-sm"
                            />
                            <Button onClick={extractId}>
                                Extract
                            </Button>
                        </div>
                        {error && (
                            <div className="text-sm text-destructive flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Results Grid */}
            {videoId && !showPaywall && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">

                    <div className="flex justify-between items-center bg-secondary/20 p-4 rounded-xl border border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600">
                                <Search className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">Video Found</h3>
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">{url}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => { setVideoId(null); setUrl(''); }}>
                            Paste Another
                        </Button>
                    </div>

                    {/* Max Res (Hero) */}
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-sm flex items-center gap-2">
                                <ImageIcon className="h-4 w-4 text-primary" />
                                Maximum Resolution (HD)
                            </h3>
                            <Button size="sm" onClick={() => downloadImage('maxresdefault')} className="gap-2 h-8 text-xs relative overflow-hidden">
                                {!isPro && <div className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-[1px] text-[10px] font-bold text-white z-10 opacity-0 hover:opacity-100 transition-opacity">Watermarked</div>}
                                <Download className="h-3 w-3" /> Download HD
                            </Button>
                        </div>
                        <div className="aspect-video bg-black/5 rounded-lg overflow-hidden relative group border border-border/50">
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                alt="Max Resolution Thumbnail"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Other Sizes Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Standard */}
                        <div className="space-y-3 p-4 border border-border/50 rounded-xl">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Standard (640x480)</span>
                                <Button variant="outline" size="sm" onClick={() => downloadImage('sddefault')}>
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`}
                                alt="SD Thumbnail"
                                className="w-full rounded-lg"
                            />
                        </div>

                        {/* HQ */}
                        <div className="space-y-3 p-4 border border-border/50 rounded-xl">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">High Quality (480x360)</span>
                                <Button variant="outline" size="sm" onClick={() => downloadImage('hqdefault')}>
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                alt="HQ Thumbnail"
                                className="w-full rounded-lg"
                            />
                        </div>
                    </div>

                </div>
            )}

            {/* Paywall Overlay State */}
            {videoId && showPaywall && (
                <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
                    <ProGate
                        isPro={isPro}
                        title="Remove Watermark"
                        description="Upgrade to UnitMaster Pro to download high-quality thumbnails without watermarks."
                        blurAmount="lg"
                    >
                        {/* Blurred Preview of the MaxRes Card */}
                        <div className="bg-card border border-border rounded-xl p-4 shadow-sm opacity-50 pointer-events-none">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-sm flex items-center gap-2">
                                    <ImageIcon className="h-4 w-4 text-primary" />
                                    Maximum Resolution (HD)
                                </h3>
                                <Button size="sm" disabled className="gap-2 h-8 text-xs">
                                    <Download className="h-3 w-3" /> Download HD
                                </Button>
                            </div>
                            <div className="aspect-video bg-black/5 rounded-lg overflow-hidden relative border border-border/50">
                                <img
                                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                    alt="Max Resolution Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </ProGate>

                    <div className="flex flex-col items-center gap-3 mt-8">
                        <Button
                            variant="outline"
                            onClick={() => downloadImage('maxresdefault', true)}
                            className="w-full sm:w-auto"
                        >
                            Download with Watermark
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPaywall(false)}
                            className="text-muted-foreground"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}



        </div>
    );
}
