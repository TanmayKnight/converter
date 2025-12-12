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
            <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-14 z-20">
                <div className="container px-4 mx-auto max-w-screen-xl py-3">
                    <CreatorNav />
                </div>
            </div>

            <div className="container px-4 mx-auto max-w-screen-xl mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Main Tool Content */}
                    <div className="lg:col-span-8 space-y-8 min-h-[60vh]">
                        {children}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        {/* Ad Unit */}
                        <div className="bg-secondary/10 rounded-xl overflow-hidden border border-border/50 min-h-[250px] flex flex-col items-center justify-center p-4">
                            <AdUnit
                                slotId="sidebar-creator-1"
                                className="w-full h-full min-h-[250px]"
                            />
                        </div>

                        {/* Explore More */}
                        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <Video className="h-4 w-4 text-primary" />
                                Creator Tools
                            </h3>
                            <div className="space-y-2">
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
                                    🎬 Tools for modern creators.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
