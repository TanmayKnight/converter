import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PdfToolsNav } from '@/components/pdf/PdfToolsNav';
import { AdUnit } from '@/components/AdUnit';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: {
        default: 'Free PDF Tools - Merge, Split, Convert',
        template: '%s | UnitMaster PDF Tools',
    },
    description: 'Secure, private, and free online PDF tools. Merge, Split, and Convert PDFs directly in your browser without uploading files.',
};

export default function PDFToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background pb-12">
            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'PDF Tools', path: '/tools/pdf' }
                ]}
            />
            {/* Sub-navigation for tools */}
            <PdfToolsNav />

            <div className="container mx-auto px-4 py-8 max-w-screen-2xl">
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
                                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                    Explore More
                                </h4>
                                <nav className="grid gap-2">
                                    <Link href="/tools/pdf/merge" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Merge PDF</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link href="/tools/pdf/split" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Split PDF</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link href="/tools/pdf/compress" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Compress PDF</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link href="/tools/pdf/sign" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Sign PDF</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <div className="h-px bg-border/50 my-1" />
                                    <p className="text-[10px] text-muted-foreground text-center">
                                        🔒 All tools run locally in browser.
                                    </p>
                                </nav>
                            </div>

                            {/* Spacer & Divider */}
                            <div className="pt-8">
                                <div className="h-px w-full bg-border/30" />
                                <p className="text-[10px] text-center text-muted-foreground/40 mt-2 uppercase tracking-widest">Sponsored</p>
                            </div>

                            <AdUnit className="h-[600px] min-h-[600px] shadow-none bg-transparent border-none" slotId="sidebar-ads" />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
