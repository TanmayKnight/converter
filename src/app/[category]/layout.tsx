import React from 'react';
import { UnitToolsNav } from '@/components/units/UnitToolsNav';
import { CalculatorToolsNav } from '@/components/calculators/CalculatorToolsNav';
import { AdUnit } from '@/components/AdUnit';
import { AD_SLOTS } from '@/lib/ads';

export default async function CategoryLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const isCurrency = category === 'currency';

    return (
        <div className="min-h-screen bg-background pb-12">
            {isCurrency ? <CalculatorToolsNav /> : <UnitToolsNav />}

            <div className="container mx-auto px-4 py-4 max-w-screen-2xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                    {/* Sidebar Ad (Matched with Calculators layout for consistency) */}
                    <aside className="w-full lg:w-80 shrink-0 space-y-8 hidden lg:block">
                        <div className="sticky top-24">
                            <AdUnit className="h-[600px]" slotId={AD_SLOTS.SIDEBAR_UNIT} />

                            <div className="mt-8 p-4 bg-secondary/30 rounded-lg border border-border/50">
                                <h4 className="font-semibold mb-2 text-sm">Convert Instantly</h4>
                                <p className="text-xs text-muted-foreground">
                                    Type any value to see results in all units simultaneously.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
