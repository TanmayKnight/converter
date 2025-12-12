'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, Code, Minimize2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function JsonFormatterPage() {
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const formatJson = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed, null, 2));
            setError(null);
            toast.success("JSON formatted successfully");
        } catch (err: any) {
            setError(err.message);
            toast.error("Invalid JSON");
        }
    };

    const minifyJson = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed));
            setError(null);
            toast.success("JSON minified successfully");
        } catch (err: any) {
            setError(err.message);
            toast.error("Invalid JSON");
        }
    };

    const copyToClipboard = () => {
        if (!input) return;
        navigator.clipboard.writeText(input);
        toast.success("Copied to clipboard");
    };

    const clearInput = () => {
        setInput('');
        setError(null);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    JSON Formatter & Validator
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Beautify, minify, and validate your JSON data. Processed locally in your browser for privacy.
                </p>
            </div>

            <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-2 bg-secondary/30 p-2 rounded-lg border border-border/50">
                    <Button onClick={formatJson} className="gap-2">
                        <Code className="h-4 w-4" /> Format
                    </Button>
                    <Button variant="outline" onClick={minifyJson} className="gap-2">
                        <Minimize2 className="h-4 w-4" /> Minify
                    </Button>
                    <div className="h-6 w-px bg-border mx-2 hidden sm:block" />
                    <Button variant="ghost" onClick={copyToClipboard} className="gap-2">
                        <Copy className="h-4 w-4" /> Copy
                    </Button>
                    <Button variant="ghost" onClick={clearInput} className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" /> Clear
                    </Button>

                    {error && (
                        <div className="ml-auto text-sm text-destructive flex items-center gap-2 animate-in fade-in">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}
                    {!error && input && (
                        <div className="ml-auto text-sm text-green-600 flex items-center gap-2 animate-in fade-in">
                            <CheckCircle2 className="h-4 w-4" /> Valid JSON
                        </div>
                    )}
                </div>

                {/* Editor Area */}
                <div className="relative">
                    <textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setError(null);
                        }}
                        placeholder="Paste your JSON here..."
                        className={`w-full h-[60vh] p-4 font-mono text-sm bg-card border rounded-xl resize-none outline-none focus:ring-2 focus:ring-primary/20 transition-all ${error ? 'border-destructive/50 focus:border-destructive' : 'border-border'
                            }`}
                        spellCheck={false}
                    />
                </div>
            </div>

            {/* SEO Content */}
            <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Why use this JSON Formatter?</h2>
                <p>
                    JSON (JavaScript Object Notation) is the standard data format for web APIs. However, minified JSON is hard to read.
                    This tool allows you to instantly beautify messy JSON, validate syntax errors, and minify it for production use.
                </p>
                <ul>
                    <li><strong>Privacy Focused</strong>: Data never leaves your browser.</li>
                    <li><strong>Validation</strong>: Instantly spots syntax errors.</li>
                    <li><strong>Fast</strong>: Handles large files efficiently.</li>
                </ul>
            </div>
        </div>
    );
}
