
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const pdfTools = [
    { name: 'Merge PDF', href: '/tools/pdf/merge' },
    { name: 'Split PDF', href: '/tools/pdf/split' },
    { name: 'Compress PDF', href: '/tools/pdf/compress' },
    { name: 'Sign PDF', href: '/tools/pdf/sign' },
    { name: 'PDF to Image', href: '/tools/pdf/pdf-to-image' },
    { name: 'Image to PDF', href: '/tools/pdf/image-to-pdf' },
];

export function PdfToolsNav() {
    const pathname = usePathname();

    return (
        <div className="border-b border-border/40 bg-background/50 backdrop-blur-sm sticky top-14 z-30">
            <div className="container mx-auto px-4 h-12 flex items-center gap-4 text-sm overflow-x-auto no-scrollbar">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
                <div className="h-4 w-px bg-border/50 shrink-0" />
                <nav className="flex items-center gap-1">
                    {pdfTools.map((tool) => {
                        const isActive = pathname === tool.href;
                        return (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className={cn(
                                    "px-3 py-1.5 rounded-full transition-colors whitespace-nowrap",
                                    isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {tool.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
