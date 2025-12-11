import Link from 'next/link';
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
                        <div className="sticky top-24 space-y-8">
                            <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
                                <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                    Trending Now
                                </h4>
                                <nav className="grid gap-2">
                                    <Link href="/length" className="text-sm text-muted-foreground hover:text-primary transition-colors">Length Converter</Link>
                                    <Link href="/weight" className="text-sm text-muted-foreground hover:text-primary transition-colors">Weight Converter</Link>
                                    <Link href="/temperature" className="text-sm text-muted-foreground hover:text-primary transition-colors">Temperature</Link>
                                    <div className="h-px bg-border/50 my-1" />
                                    <Link href="/tools/image/passport" className="text-sm font-medium text-primary hover:underline">Try Passport Photo ✨</Link>
                                </nav>
                            </div>

                            <AdUnit className="h-[600px]" slotId={AD_SLOTS.SIDEBAR_UNIT} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
