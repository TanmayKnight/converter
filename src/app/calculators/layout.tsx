import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdUnit } from '@/components/AdUnit';

export default function CalculatorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-screen-2xl">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Calculator Content */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>

                {/* Sidebar Ad Slot */}
                <aside className="w-full lg:w-80 shrink-0 space-y-8">
                    <div className="sticky top-24">
                        <AdUnit className="h-[600px]" slotId="sidebar-calculator-slot" />

                        <div className="mt-8 p-4 bg-secondary/30 rounded-lg border border-border/50">
                            <h4 className="font-semibold mb-2 text-sm">Pro Tip</h4>
                            <p className="text-xs text-muted-foreground">
                                Bookmark this page for quick access to your most used calculations.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
