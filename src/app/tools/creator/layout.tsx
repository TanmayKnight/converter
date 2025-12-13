import type { Metadata } from 'next';
import { ArrowLeft, Video, Youtube, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { CreatorNav } from '@/components/creator/CreatorNav';
import { AdUnit } from '@/components/AdUnit';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: {
        default: 'Creator Studio - Free Tools for YouTubers & Content Creators',
        template: '%s | UnitMaster Creator Studio',
    },
    description: 'Boost your content creation workflow with free tools. Download YouTube thumbnails, trim videos, and extract audio instantly.',
    keywords: ['youtube thumbnail downloader', 'video tools', 'content creator', 'video trimmer', 'audio extractor'],
};

export default function CreatorToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background pb-12">
            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Creator Studio', path: '/tools/creator' }
                ]}
            />
            {/* Sub-navigation for tools */}
            <CreatorNav />

            <div className="container mx-auto px-4 py-4 max-w-screen-2xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Tool Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                    {/* Sidebar */}
                    {/* Sidebar Ad Slot */}
                    <aside className="w-full lg:w-80 shrink-0 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
                                <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                                    Explore More
                                </h4>
                                <nav className="grid gap-2">
                                    <Link href="/tools/creator/thumbnail" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Thumbnail Grabber</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <div className="text-sm text-muted-foreground/50 flex items-center justify-between group cursor-not-allowed">
                                        <span>Video Trimmer</span>
                                        <span className="text-[10px] bg-secondary px-1 py-0.5 rounded">Soon</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground/50 flex items-center justify-between group cursor-not-allowed">
                                        <span>Audio Extractor</span>
                                        <span className="text-[10px] bg-secondary px-1 py-0.5 rounded">Soon</span>
                                    </div>

                                    <div className="h-px bg-border/50 my-1" />
                                    <p className="text-[10px] text-muted-foreground text-center">
                                        🔒 Tools for modern creators.
                                    </p>
                                </nav>
                            </div>

                            <AdUnit className="h-[600px]" slotId="sidebar-creator-1" />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
