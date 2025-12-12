'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, LockKeyhole, FileJson, Copy, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function JwtDebuggerPage() {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState<string | null>(null);
    const [payload, setPayload] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Schema for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster JWT Debugger',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: 'Decode JWT, Inspect Header, Inspect Payload, Debug Claims',
        description: 'Free online JWT Debugger. Decode and inspect JSON Web Tokens client-side. Secure and private.',
    };

    useEffect(() => {
        if (!token.trim()) {
            setHeader(null);
            setPayload(null);
            setError(null);
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error("Invalid JWT format (must have 3 parts)");
            }

            const decode = (str: string) => {
                const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
                const json = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(json);
            };

            const headerObj = decode(parts[0]);
            const payloadObj = decode(parts[1]);

            setHeader(JSON.stringify(headerObj, null, 2));
            setPayload(JSON.stringify(payloadObj, null, 2));
            setError(null);
        } catch (err: any) {
            setError(err.message || "Invalid Token");
            setHeader(null);
            setPayload(null);
        }
    }, [token]);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setToken(text);
        } catch {
            toast.error("Could not access clipboard");
        }
    };

    return (
        <div className="space-y-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
                    JWT Debugger
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Decode and debug your JSON Web Tokens instantly.
                    <br />
                    <span className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded text-primary">Client-side only. Your tokens never leave your browser.</span>
                </p>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <LockKeyhole className="h-4 w-4 text-primary" />
                        Encoded Token
                    </label>
                    <Button variant="ghost" size="sm" onClick={handlePaste} className="h-8 gap-2 text-primary">
                        Paste Token
                    </Button>
                </div>
                <textarea
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className={`w-full h-32 p-4 font-mono text-sm bg-card border rounded-xl resize-none outline-none focus:ring-2 focus:ring-primary/20 transition-all ${error ? 'border-destructive/50 focus:border-destructive' : 'border-border'}`}
                />
                {error && (
                    <div className="text-sm text-destructive flex items-center gap-2 animate-in fade-in">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}
            </div>

            {/* Output Grid */}
            {(header || payload) && (
                <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
                    {/* Header */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2 text-rose-500">
                            <Shield className="h-4 w-4" />
                            Header
                        </label>
                        <div className="relative group">
                            <pre className="w-full h-64 p-4 font-mono text-xs bg-secondary/20 border border-rose-500/20 rounded-xl overflow-auto custom-scrollbar">
                                {header}
                            </pre>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                    navigator.clipboard.writeText(header || '');
                                    toast.success("Header copied");
                                }}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Payload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2 text-purple-500">
                            <FileJson className="h-4 w-4" />
                            Payload
                        </label>
                        <div className="relative group">
                            <pre className="w-full h-64 p-4 font-mono text-xs bg-secondary/20 border border-purple-500/20 rounded-xl overflow-auto custom-scrollbar">
                                {payload}
                            </pre>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                    navigator.clipboard.writeText(payload || '');
                                    toast.success("Payload copied");
                                }}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* SEO Content */}
            <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>How to Debug JWTs?</h2>
                <p>
                    JSON Web Tokens (JWT) are widely used for authentication. This debugger allows you to:
                </p>
                <ul>
                    <li><strong>Inspect Claims</strong>: See exactly what data is inside the token (User ID, Expiry, Roles).</li>
                    <li><strong>Verify Structure</strong>: Check if the token has the correct Header, Payload, and Signature structure.</li>
                    <li><strong>Debug Expiration</strong>: Check the `exp` claim to see if your token is expired.</li>
                </ul>
                <p className="text-sm text-muted-foreground italic">
                    Note: We do not verify the signature because that requires your secret key, which should <strong>never</strong> be shared.
                </p>
            </div>
        </div>
    );
}
