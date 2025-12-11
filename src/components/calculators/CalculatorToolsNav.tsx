'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavLink = { href: string; label: string };

const FINANCE_LINKS: NavLink[] = [
    { href: '/calculators/finance/mortgage', label: 'Mortgage' },
    { href: '/calculators/finance/loan', label: 'Loan' },
    { href: '/calculators/finance/investment', label: 'Investment / ROI' },
    { href: '/calculators/finance/tax', label: 'Tax (GST/VAT)' },
    { href: '/calculators/finance/retirement', label: 'Retirement' },
    { href: '/currency', label: 'Currency' },
];

const MATH_LINKS: NavLink[] = [
    { href: '/calculators/math/percentage', label: 'Percentage' },
    { href: '/calculators/math/statistics', label: 'Statistics' },
    { href: '/calculators/math/algebra', label: 'Algebra' },
    { href: '/calculators/math/trigonometry', label: 'Trigonometry' },
    { href: '/calculators/geometry/area', label: 'Area & Volume' },
    { href: '/calculators/math/base', label: 'Base Converter' },
];

const SCIENCE_LINKS: NavLink[] = [
    { href: '/calculators/technology/px-to-rem', label: 'Px to Rem' },
    { href: '/calculators/physics/ohms-law', label: 'Ohm\'s Law' },
    { href: '/pressure', label: 'Pressure' },
    { href: '/power', label: 'Power' },
    { href: '/force', label: 'Force' },
];

export function CalculatorToolsNav() {
    const pathname = usePathname();

    let links: NavLink[] = [];
    if (pathname.includes('/finance') || pathname.includes('/currency')) {
        links = FINANCE_LINKS;
    } else if (pathname.includes('/math') || pathname.includes('/geometry')) {
        links = MATH_LINKS;
    } else if (pathname.includes('/physics') || pathname.includes('/technology')) {
        links = SCIENCE_LINKS;
    } else {
        // Fallback or maybe show categories? 
        // For now, if we are in root /calculators, maybe show Finance as default or nothing?
        // Let's default to nothing if no specific category matched, 
        // OR if it's strictly /calculators, maybe we don't show specific sub-links yet 
        // until they pick a category. But user wants "seamless". 
        // Let's try to detect if we are in a sub-tool that isn't caught.
        // If nothing matches, we might just hide the nav items but keep the "Back to Home".
    }

    // Special Case: If we are on a page like /currency (which is root level but finance-related),
    // we need to make sure this component is mounted there. 
    // Wait, /currency uses app/page.tsx or app/currency/page.tsx?
    // User might have defined /currency as a separate route not under calculators.
    // I should check if /currency needs its own layout or if I should wrap it.
    // For now, let's focus on /calculators/* routes.

    return (
        <div className="border-b border-border/40 bg-background/50 backdrop-blur-sm sticky top-14 z-30">
            <div className="container mx-auto px-4 h-12 flex items-center gap-4 text-sm overflow-x-auto no-scrollbar">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                {links.length > 0 && (
                    <>
                        <div className="h-4 w-px bg-border/50 shrink-0" />
                        <nav className="flex items-center gap-1">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full transition-colors whitespace-nowrap",
                                            isActive
                                                ? "bg-primary/10 text-primary font-medium"
                                                : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </>
                )}
            </div>
        </div>
    );
}
