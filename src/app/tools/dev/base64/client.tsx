'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Copy, Trash2, Binary } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Base64Client() {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Schema for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster Base64 Converter',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: 'Base64 Encode, Base64 Decode, UTF-8 Support',
        description: 'Free online Base64 encoder and decoder. Convert text to Base64 and back instantly. Supports UTF-8 characters.',
    };

    useEffect(() => {
        if (!input) {
            setOutput('');
            setError(null);
            return;
        }

        try {
            if (mode === 'encode') {
                // UTF-8 safe encoding
                const encoded = btoa(unescape(encodeURIComponent(input)));
                setOutput(encoded);
            } else {
                // UTF-8 safe decoding
                const decoded = decodeURIComponent(escape(atob(input)));
                setOutput(decoded);
            }
            setError(null);
        } catch (err) {
            setOutput('');
            setError(mode === 'encode' ? 'Encoding failed' : 'Invalid Base64 string');
        }
    }, [input, mode]);

    const copyOutput = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success(mode === 'encode' ? "Base64 copied" : "Text copied");
    };

    return (
        <div className="space-y-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                    Base64 Converter
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Encode and decode data using Base64 format. Secure, client-side processing with full UTF-8 support.
                </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex justify-center mb-8">
                <div className="bg-secondary/50 p-1 rounded-full border border-border flex items-center gap-1">
                    <button
                        onClick={() => setMode('encode')}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all",
                            mode === 'encode' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all",
                            mode === 'decode' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            {mode === 'encode' ? "Plain Text" : "Base64 String"}
                        </span>
                        {input && (
                            <button onClick={() => setInput('')} className="text-xs text-destructive hover:underline flex items-center gap-1">
                                <Trash2 className="h-3 w-3" /> Clear
                            </button>
                        )}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? "Type text to encode..." : "Paste Base64 to decode..."}
                        className={`w-full h-64 p-4 font-mono text-sm bg-card border rounded-xl resize-none outline-none focus:ring-2 focus:ring-primary/20 transition-all ${error ? 'border-destructive/50 focus:border-destructive' : 'border-border'}`}
                    />
                    {error && (
                        <div className="text-sm text-destructive animate-in fade-in">
                            {error}
                        </div>
                    )}
                </div>

                {/* Output */}
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center justify-between">
                        <span className="flex items-center gap-2 text-primary">
                            <Binary className="h-3 w-3" />
                            {mode === 'encode' ? "Base64 Output" : "Text Output"}
                        </span>
                        {output && (
                            <span className="text-xs text-muted-foreground font-mono">
                                {output.length} chars
                            </span>
                        )}
                    </label>
                    <div className="relative group">
                        <textarea
                            readOnly
                            value={output}
                            placeholder="Result will appear here..."
                            className="w-full h-64 p-4 font-mono text-sm bg-secondary/20 border border-primary/10 rounded-xl resize-none outline-none text-muted-foreground"
                        />
                        {output && (
                            <Button
                                size="sm"
                                variant="secondary"
                                className="absolute top-4 right-4 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={copyOutput}
                            >
                                <Copy className="h-4 w-4 mr-2" /> Copy
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* SEO Content */}
            <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>What is Base64?</h2>
                <p>
                    Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
                    It is commonly used to encode data that needs to be stored and transferred over media that are designed to deal with textual data.
                </p>
                <ul>
                    <li><strong>UTF-8 Support</strong>: Correctly handles emojis and foreign characters.</li>
                    <li><strong>Privacy</strong>: All conversion happens in your browser.</li>
                </ul>
            </div>
        </div>
    );
}
