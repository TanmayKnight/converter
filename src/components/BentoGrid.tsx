'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

export interface BentoItem {
    title: string;
    href: string;
    icon?: React.ReactNode;
    featured?: boolean;
    type?: 'calculator' | 'converter' | 'tool' | 'other';
}

export interface BentoCategoryProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    colorTheme: 'blue' | 'emerald' | 'purple' | 'orange' | 'rose';
    items: BentoItem[];
    className?: string; // For customized grid spanning (e.g. col-span-2)
    comingSoon?: boolean;
}

const themeStyles = {
    blue: {
        bg: "bg-blue-500/5 hover:bg-blue-500/10",
        border: "border-blue-500/20 hover:border-blue-500/40",
        text: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        gradient: "from-blue-500/5 to-transparent",
    },
    emerald: {
        bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
        border: "border-emerald-500/20 hover:border-emerald-500/40",
        text: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        gradient: "from-emerald-500/5 to-transparent",
    },
    purple: {
        bg: "bg-purple-500/5 hover:bg-purple-500/10",
        border: "border-purple-500/20 hover:border-purple-500/40",
        text: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-100 dark:bg-purple-900/30",
        gradient: "from-purple-500/5 to-transparent",
    },
    orange: {
        bg: "bg-orange-500/5 hover:bg-orange-500/10",
        border: "border-orange-500/20 hover:border-orange-500/40",
        text: "text-orange-600 dark:text-orange-400",
        iconBg: "bg-orange-100 dark:bg-orange-900/30",
        gradient: "from-orange-500/5 to-transparent",
    },
    rose: {
        bg: "bg-rose-500/5 hover:bg-rose-500/10",
        border: "border-rose-500/20 hover:border-rose-500/40",
        text: "text-rose-600 dark:text-rose-400",
        iconBg: "bg-rose-100 dark:bg-rose-900/30",
        gradient: "from-rose-500/5 to-transparent",
    },
};

// Helper map for type badges
const typeBadges = {
    calculator: { label: 'Calc', bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
    converter: { label: 'Conv', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
    tool: { label: 'Tool', bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
    other: { label: 'Other', bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-500' },
};

export function BentoCard({ title, description, icon, colorTheme, items, className, comingSoon }: BentoCategoryProps) {
    const theme = themeStyles[colorTheme];
    const featuredItems = items.filter(i => i.featured);
    const standardItems = items.filter(i => !i.featured);

    return (
        <div className={cn(
            "group relative overflow-hidden rounded-3xl border transition-all duration-300 flex flex-col h-full",
            theme.bg,
            theme.border,
            className
        )}>
            {/* Background Gradient */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", theme.gradient)} />

            {/* Coming Soon Overlay */}
            {comingSoon && (
                <div className="absolute top-3 right-3 z-20">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                        Coming Soon
                    </span>
                </div>
            )}

            {/* Header Content */}
            <div className="relative p-6 pb-2 z-10 shrink-0">
                <div className="flex items-start justify-between mb-3">
                    <div className={cn("p-3 rounded-2xl", theme.iconBg)}>
                        {/* Render ReactNode directly, cloning to add class if needed, or just wrapping div handles color */}
                        <div className={cn("h-6 w-6 flex items-center justify-center", theme.text)}>
                            {icon}
                        </div>
                    </div>
                    <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-background/50 backdrop-blur-sm border border-border/50", theme.text)}>
                        {items.length} Tools
                    </div>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            </div>

            {/* Featured Links (Always Visible) */}
            <div className="relative px-6 py-2 space-y-2 z-10 shrink-0">
                {featuredItems.map((item, idx) => {
                    const badge = item.type ? typeBadges[item.type] : null;
                    return (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex items-center justify-between p-3 rounded-xl bg-background/60 hover:bg-background border border-border/30 hover:border-border/60 transition-all shadow-sm group/item"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                {item.icon && (
                                    <div className={cn("h-4 w-4 opacity-70 flex items-center justify-center shrink-0", theme.text)}>
                                        {item.icon}
                                    </div>
                                )}
                                <span className="font-medium text-sm truncate">{item.title}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                {badge && (
                                    <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider", badge.bg, badge.text)}>
                                        {badge.label}
                                    </span>
                                )}
                                <ArrowRight className="h-3 w-3 text-muted-foreground -translate-x-2 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Expanded List (Conditionally Visible / Scrollable on mobile) */}
            <div className="relative px-6 pb-6 pt-4 z-10 flex-1 overflow-hidden">
                {/* Visual Divider */}
                {standardItems.length > 0 && <div className="h-px w-full bg-border/40 mb-4" />}

                <div className="grid grid-cols-2 gap-2 transform translate-y-4 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {standardItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-background/40 transition-colors"
                        >
                            <span className={cn("h-1.5 w-1.5 rounded-full", theme.bg.replace('/5', '/50'))} />
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
            {/* Opacity for Coming Soon */}
            {comingSoon && (
                <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px] z-10 pointer-events-none" />
            )}
        </div>
    );
}

export function BentoGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
            {children}
        </div>
    );
}
