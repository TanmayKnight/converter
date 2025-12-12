'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Search, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ThumbnailPage() {
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

            <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                    YouTube Thumbnail Grabber
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Download high-quality thumbnails from any YouTube video.
                </p>
            </div>

            {/* Input Section */}
            <div className="max-w-xl mx-auto space-y-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && extractId()}
                        placeholder="Paste YouTube URL here (e.g. https://youtu.be/...)"
                        className="flex-1 h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    <Button onClick={extractId} size="lg" className="rounded-xl h-12 px-6">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
                {error && (
                    <div className="text-sm text-destructive flex items-center gap-2 justify-center animate-in fade-in">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}
            </div>

            {/* Results Grid */}
            {videoId && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">

                    {/* Max Res (Hero) */}
                    <div className="space-y-3 bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <ImageIcon className="h-5 w-5 text-primary" />
                                Maximum Resolution (HD)
                            </h3>
                            <Button onClick={() => downloadImage('maxresdefault')} className="gap-2">
                                <Download className="h-4 w-4" /> Download HD
                            </Button>
                        </div>
                        <div className="aspect-video bg-black/5 rounded-xl overflow-hidden relative group">
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                alt="Max Resolution Thumbnail"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            Note: Some older videos may not have MaxRes thumbnails.
                        </p>
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

            {/* SEO Content */}
            <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Why download YouTube Thumbnails?</h2>
                <p>
                    Creators often need to recover their own thumbnails for:
                </p>
                <ul>
                    <li><strong>Reposting</strong>: Sharing content on other platforms (LinkedIn, Twitter).</li>
                    <li><strong>Archiving</strong>: Backing up your channel assets.</li>
                    <li><strong>Analysis</strong>: Studying successful thumbnails from competitors.</li>
                </ul>
            </div>
        </div>
    );
}
