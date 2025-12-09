'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftRight, Check, Copy, Code } from 'lucide-react';
import { AffiliateCard } from '@/components/AffiliateCard';

export default function PxRemConverter() {
    const [baseSize, setBaseSize] = useState('16');
    const [px, setPx] = useState('16');
    const [rem, setRem] = useState('1');

    const handlePxChange = (val: string) => {
        setPx(val);
        const p = parseFloat(val);
        const b = parseFloat(baseSize);
        if (!isNaN(p) && !isNaN(b) && b !== 0) {
            setRem((p / b).toFixed(3).replace(/\.?0+$/, ''));
        }
    };

    const handleRemChange = (val: string) => {
        setRem(val);
        const r = parseFloat(val);
        const b = parseFloat(baseSize);
        if (!isNaN(r) && !isNaN(b)) {
            setPx((r * b).toFixed(0));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">PX to REM Converter</h1>
                <p className="text-muted-foreground">Essential tool for responsive web design.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-10 shadow-lg max-w-2xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Code className="w-32 h-32" />
                </div>

                {/* Base Size Setting */}
                <div className="mb-8 flex justify-center items-center gap-2">
                    <label className="text-sm font-medium text-muted-foreground">Base Font Size (px):</label>
                    <input
                        type="number"
                        value={baseSize}
                        onChange={(e) => setBaseSize(e.target.value)}
                        className="w-16 bg-secondary text-center rounded-md border border-border py-1 font-semibold"
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 w-full">
                        <label className="block text-center text-sm font-bold mb-2 text-primary">PIXELS</label>
                        <input
                            type="number"
                            value={px}
                            onChange={(e) => handlePxChange(e.target.value)}
                            className="w-full bg-secondary/50 border-2 border-transparent focus:border-primary rounded-2xl p-6 text-4xl text-center font-bold outline-none transition-all"
                        />
                    </div>

                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <ArrowLeftRight className="h-6 w-6" />
                    </div>

                    <div className="flex-1 w-full">
                        <label className="block text-center text-sm font-bold mb-2 text-primary">REM</label>
                        <input
                            type="number"
                            value={rem}
                            onChange={(e) => handleRemChange(e.target.value)}
                            className="w-full bg-secondary/50 border-2 border-transparent focus:border-primary rounded-2xl p-6 text-4xl text-center font-bold outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-xl font-bold mb-6 text-center">Web Development Tools</h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <AffiliateCard
                        title="Hostinger"
                        description="Premium Shared Hosting + Free Domain. Everything you need to launch a website."
                        ctaText="Get Started"
                        href="https://www.hostinger.com/"
                        badge="75% OFF"
                    />
                    <AffiliateCard
                        title="Udemy"
                        description="Learn React, Next.js and TypeScript from industry experts."
                        ctaText="Find Courses"
                        href="https://www.udemy.com/"
                        badge="Best Seller"
                    />
                </div>
            </div>
        </div>
    );
}
