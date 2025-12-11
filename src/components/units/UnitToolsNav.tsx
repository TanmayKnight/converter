'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const UNIT_LINKS = [
    { href: '/length', label: 'Length' },
    { href: '/weight', label: 'Weight' },
    { href: '/temperature', label: 'Temp' },
    { href: '/volume', label: 'Volume' },
    { href: '/area', label: 'Area' },
    { href: '/time', label: 'Time' },
    { href: '/speed', label: 'Speed' },
    { href: '/digital', label: 'Digital' },
    // Featured Science Units
    { href: '/pressure', label: 'Pressure' },
    { href: '/power', label: 'Power' },
    { href: '/energy', label: 'Energy' },
];

export function UnitToolsNav() {
    const pathname = usePathname();

    const isUnitPage = UNIT_LINKS.some(u => pathname.startsWith(u.href));
    // If we are on /currency, maybe show this or CalculatorNav? 
    // Usually Currency is better with Finance Nav.
    // If I am on /length/meter-to-inch, pathname starts with /length.

    return (
        <div className="border-b border-border/40 bg-background/50 backdrop-blur-sm sticky top-14 z-30">
            <div className="container mx-auto px-4 h-12 flex items-center gap-4 text-sm overflow-x-auto no-scrollbar">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
                <div className="h-4 w-px bg-border/50 shrink-0" />
                <nav className="flex items-center gap-1">
                    {UNIT_LINKS.map((link) => {
                        const isActive = pathname.startsWith(link.href);
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
            </div>
        </div>
    );
}
