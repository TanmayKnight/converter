'use client';

import { useState } from 'react';

export default function AsciiConverterClient() {
    const [text, setText] = useState('Hello');

    // Derived state for ASCII
    let hex = '';
    let binary = '';
    let decimal = '';

    if (text) {
        hex = text.split('').map(c => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(' ');
        binary = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        decimal = text.split('').map(c => c.charCodeAt(0).toString()).join(' ');
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
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
        </div>
    );
}
