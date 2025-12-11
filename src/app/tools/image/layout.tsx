import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ImageToolsNav } from '@/components/image-tools/ImageToolsNav';
import { AdUnit } from '@/components/AdUnit';
import { AD_SLOTS } from '@/lib/ads';

export const metadata: Metadata = {
    title: 'Free Online Image Tools - Crop, Resize, Remove Background',
    description: 'Professional browser-based image tools. Crop, resize, convert, and remove backgrounds from images instantly. No upgrades required.',
};

export default function ImageToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background pb-12">
            {/* Sub-navigation for tools */}
            <ImageToolsNav />

            <div className="container mx-auto px-4 py-4 max-w-screen-2xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Tool Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                    {/* Sidebar Ad Slot */}
                    <aside className="w-full lg:w-80 shrink-0 space-y-8">
                        <div className="sticky top-24">
                            <AdUnit className="h-[600px]" slotId={AD_SLOTS.SIDEBAR_IMAGE} />

                            <div className="mt-8 p-4 bg-secondary/30 rounded-lg border border-border/50">
                                <h4 className="font-semibold mb-2 text-sm">Privacy Focused</h4>
                                <p className="text-xs text-muted-foreground">
                                    All processing happens in your browser. Your images are never uploaded to our servers.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
