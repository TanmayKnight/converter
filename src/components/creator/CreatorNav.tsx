'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Image as ImageIcon, Video, Mic, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CreatorNav() {
    const pathname = usePathname();

    const links = [
        { href: '/tools/creator/thumbnail', label: 'Thumbnail Grabber' },
        { href: '/tools/creator/trimmer', label: 'Video Trimmer', disabled: true },
        { href: '/tools/creator/audio', label: 'Audio Extractor', disabled: true },
    ];

    return (
        <div className="border-b border-border/40 bg-background/50 backdrop-blur-sm sticky top-14 z-30">
            <div className="container mx-auto px-4 h-12 flex items-center gap-4 text-sm overflow-x-auto no-scrollbar">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
                <div className="h-4 w-px bg-border/50 shrink-0" />
                <nav className="flex items-center gap-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href;

                        if (link.disabled) {
                            return (
                                <div
                                    key={link.href}
                                    className="px-3 py-1.5 rounded-full text-muted-foreground/50 cursor-not-allowed flex items-center gap-2 whitespace-nowrap text-xs"
                                >
                                    {link.label}
                                    <span className="text-[10px] bg-secondary px-1.5 rounded">Soon</span>
                                </div>
                            );
                        }

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
