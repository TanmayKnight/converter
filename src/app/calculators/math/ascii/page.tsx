'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AsciiConverter() {
    const [text, setText] = useState('Hello');
    const [hex, setHex] = useState('');
    const [binary, setBinary] = useState('');
    const [decimal, setDecimal] = useState('');

    useEffect(() => {
        if (!text) {
            setHex('');
            setBinary('');
            setDecimal('');
            return;
        }

        const chars = text.split('');

        setHex(chars.map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' '));
        setBinary(chars.map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));
        setDecimal(chars.map(c => c.charCodeAt(0).toString(10)).join(' '));
    }, [text]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">ASCII Text Converter</h1>
                <p className="text-muted-foreground">Convert text to Binary, Hexadecimal, and Decimal ASCII codes.</p>
            </div>

            <div className="grid gap-8">
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">Input Text</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full bg-secondary/30 border border-primary/20 focus:border-primary rounded-xl p-4 min-h-[100px] outline-none transition-all"
                        placeholder="Type text here..."
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <label className="text-sm font-semibold text-primary mb-2 block">Hexadecimal</label>
                        <div className="font-mono text-sm break-all leading-relaxed bg-secondary/20 p-4 rounded-xl">
                            {hex || '...'}
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <label className="text-sm font-semibold text-primary mb-2 block">Binary</label>
                        <div className="font-mono text-sm break-all leading-relaxed bg-secondary/20 p-4 rounded-xl">
                            {binary || '...'}
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm md:col-span-2">
                        <label className="text-sm font-semibold text-primary mb-2 block">Decimal Codes</label>
                        <div className="font-mono text-sm break-all leading-relaxed bg-secondary/20 p-4 rounded-xl">
                            {decimal || '...'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
