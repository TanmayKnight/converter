'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, Video, Mic, Scissors } from 'lucide-react';

export function CreatorNav() {
    const pathname = usePathname();

    const links = [
        { href: '/tools/creator/thumbnail', label: 'Thumbnail Grabber', icon: ImageIcon },
        { href: '/tools/creator/trimmer', label: 'Video Trimmer', icon: Scissors, disabled: true }, // Placeholder
        { href: '/tools/creator/audio', label: 'Audio Extractor', icon: Mic, disabled: true }, // Placeholder
    ];

    return (
        <nav className="flex overflow-x-auto pb-2 mb-8 gap-2 border-b border-border/40 scrollbar-none">
            {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                if (link.disabled) {
                    return (
                        <div
                            key={link.href}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground/50 cursor-not-allowed border border-transparent"
                        >
                            <Icon className="h-4 w-4" />
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
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                            isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-border"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}
