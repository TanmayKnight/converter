import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { DevToolsNav } from '@/components/dev-tools/DevToolsNav';
import { AdUnit } from '@/components/AdUnit';
import { AD_SLOTS } from '@/lib/ads';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: {
        default: 'Developer Utility Belt - JSON, QR, Base64',
        template: '%s | UnitMaster Dev Tools',
    },
    description: 'Essential developer tools running locally in your browser. JSON Formatter, QR Code Generator, and more. Privacy-focused.',
};

export default function DevToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background pb-12">
            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Developer Tools', path: '/tools/dev' }
                ]}
            />
            {/* Sub-navigation for tools */}
            <DevToolsNav />

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
                                    <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                                    Explore More
                                </h4>
                                <nav className="grid gap-2">
                                    <Link href="/tools/dev/json-formatter" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>JSON Formatter</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link href="/tools/dev/qr-code" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>QR Code Gen</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link href="/tools/dev/jwt-debugger" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>JWT Debugger</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link href="/tools/dev/base64" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Base64 Converter</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <div className="h-px bg-border/50 my-1" />
                                    <p className="text-[10px] text-muted-foreground text-center">
                                        🔒 All tools run locally in browser.
                                    </p>
                                </nav>
                            </div>

                            <AdUnit className="h-[600px] min-h-[600px]" slotId={AD_SLOTS.SIDEBAR_IMAGE} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
