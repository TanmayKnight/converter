import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdUnit } from '@/components/AdUnit';
import { CalculatorToolsNav } from '@/components/calculators/CalculatorToolsNav';

export default function CalculatorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background pb-12">
            <CalculatorToolsNav />

            <div className="container mx-auto px-4 py-4 max-w-screen-2xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Calculator Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                    {/* Sidebar Ad Slot */}
                    <aside className="w-full lg:w-80 shrink-0 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
                                <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    Popular Tools
                                </h4>
                                <nav className="grid gap-2">
                                    <Link href="/tools/image/passport" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Passport Photo</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link href="/calculators/finance/mortgage" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Mortgage Calc</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link href="/currency" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>Currency Converter</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link href="/calculators/health/bmi" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group">
                                        <span>BMI Calculator</span>
                                        <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </nav>
                            </div>

                            <AdUnit className="h-[600px]" slotId="sidebar-calculator-slot" />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
