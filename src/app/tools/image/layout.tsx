import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ImageToolsNav } from '@/components/image-tools/ImageToolsNav';
import { AdUnit } from '@/components/AdUnit';
import { AD_SLOTS } from '@/lib/ads';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

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
            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Image Tools', path: '/tools/image' }
                ]}
            />
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
                        <div className="sticky top-24 space-y-8">
                            <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
                                <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                                    Explore More
                                </h4>
                                <nav className="grid gap-2">
                                    <Link href="/tools/image/remove-bg" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Remove Background</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link href="/tools/image/converter" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Format Converter</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <div className="h-px bg-border/50 my-1" />
                                    <p className="text-[10px] text-muted-foreground text-center">
                                        🔒 All tools run locally in browser.
                                    </p>
                                </nav>
                            </div>

                            <AdUnit className="h-[600px]" slotId={AD_SLOTS.SIDEBAR_IMAGE} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
