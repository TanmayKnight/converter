'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { AdUnit } from '@/components/AdUnit';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export interface ToolSidebarLink {
    label: string;
    href: string;
    disabled?: boolean;
}

export interface ToolSidebarConfig {
    title: string;
    icon?: React.ReactNode;
    links: ToolSidebarLink[];
    adSlotId: string;
}

interface ToolLayoutWrapperProps {
    children: React.ReactNode;
    navbar: React.ReactNode;
    breadcrumbs: { name: string; path: string }[];
    sidebar: ToolSidebarConfig;
}

export function ToolLayoutWrapper({
    children,
    navbar,
    breadcrumbs,
    sidebar,
}: ToolLayoutWrapperProps) {
    return (
        <div className="min-h-screen bg-background pb-12">
            <JsonLdBreadcrumb crumbs={breadcrumbs} />

            {/* Sub-navigation */}
            {navbar}

            <div className="container mx-auto px-4 py-4 max-w-screen-2xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Tool Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 shrink-0 space-y-8">
                        <div className="sticky top-24 space-y-8">

                            {/* Explore More Card */}
                            <div className="p-4 bg-card rounded-xl border border-border shadow-sm">
                                <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                                    {sidebar.icon ? sidebar.icon : <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />}
                                    {sidebar.title}
                                </h4>
                                <nav className="grid gap-2">
                                    {sidebar.links.map((link) => (
                                        <div key={link.label}>
                                            {link.disabled ? (
                                                <div className="text-sm text-muted-foreground/50 flex items-center justify-between group cursor-not-allowed">
                                                    <span>{link.label}</span>
                                                    <span className="text-[10px] bg-secondary px-1 py-0.5 rounded">Soon</span>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"
                                                >
                                                    <span>{link.label}</span>
                                                    <ArrowLeft className="h-3 w-3 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </Link>
                                            )}
                                        </div>
                                    ))}

                                    <div className="h-px bg-border/50 my-1" />
                                    <p className="text-[10px] text-muted-foreground text-center">
                                        🔒 All tools run locally in browser.
                                    </p>
                                </nav>
                            </div>

                            {/* Spacer & Divider */}
                            <div className="pt-8">
                                <div className="h-px w-full bg-border/30" />
                                <p className="text-[10px] text-center text-muted-foreground/40 mt-2 uppercase tracking-widest">Sponsored</p>
                            </div>

                            {/* Ad Unit - Distinct Separation */}
                            <AdUnit className="h-[600px] shadow-none bg-transparent border-none" slotId={sidebar.adSlotId} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
