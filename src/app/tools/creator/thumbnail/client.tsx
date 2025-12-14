'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Search, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ThumbnailClient() {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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

    const downloadImage = async (quality: string) => {
        if (!videoId) return;
        const imageUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
        const fileName = `thumbnail_${videoId}_${quality}.jpg`;

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            toast.success("Download started");
        } catch (err) {
            console.error(err);
            // Fallback: Open in new tab if CORS fails (though it shouldn't for img.youtube.com)
            window.open(imageUrl, '_blank');
            toast.info("Opened in new tab (Right click to save)");
        }
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
            {videoId && (
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
                            <Button size="sm" onClick={() => downloadImage('maxresdefault')} className="gap-2 h-8 text-xs">
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

        </div>
    );
}
