'use client';

import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download, Link as LinkIcon, Type, Palette, Lock, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { usePro } from '@/hooks/usePro';

export default function QrCodeClient() {
    const { isPro } = usePro();
    const [text, setText] = useState('');
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const canvasRef = useRef<HTMLDivElement>(null);

    const downloadQrCode = () => {
        if (!text) return;

        const canvas = canvasRef.current?.querySelector('canvas');
        if (!canvas) {
            toast.error("Could not generate image");
            return;
        }

        const url = canvas.toDataURL('image/png');
        const anchor = document.createElement('a');
        anchor.download = 'qrcode.png';
        anchor.href = url;
        anchor.click();
        toast.success("QR Code downloaded");
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster QR Code Generator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: 'Generate QR Codes, Custom Size, Download PNG',
        description: 'Free online QR code generator. Create custom QR codes for URLs, text, and Wi-Fi instantly.',
    };

    return (
        <div className="space-y-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    QR Code Generator
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Create simplified, high-quality QR codes for your links, text, or Wi-Fi.
                    Download instantly as PNG.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                                Content
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter URL or Text..."
                                className="w-full h-32 p-3 text-sm bg-secondary/50 border border-transparent focus:border-primary/20 rounded-lg outline-none resize-none transition-all placeholder:text-muted-foreground/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Size (px)</label>
                            <input
                                type="range"
                                min="128"
                                max="1024"
                                step="32"
                                value={size}
                                onChange={(e) => setSize(Number(e.target.value))}
                                className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="text-xs text-muted-foreground text-right">{size}px</div>
                        </div>

                        {/* Customization (Pro) */}
                        <div className="space-y-3 pt-4 border-t">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Palette className="h-4 w-4 text-muted-foreground" />
                                    Custom Colors
                                </label>
                                {!isPro && (
                                    <span className="text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Lock className="w-3 h-3" /> PRO
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground">Foreground</span>
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={fgColor}
                                            onChange={(e) => isPro && setFgColor(e.target.value)}
                                            disabled={!isPro}
                                            className={`w-full h-10 rounded-lg cursor-pointer ${!isPro ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        />
                                        {!isPro && <div className="absolute inset-0 z-10" onClick={() => window.location.href = '/pricing'} />}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground">Background</span>
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => isPro && setBgColor(e.target.value)}
                                            disabled={!isPro}
                                            className={`w-full h-10 rounded-lg cursor-pointer ${!isPro ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        />
                                        {!isPro && <div className="absolute inset-0 z-10" onClick={() => window.location.href = '/pricing'} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="space-y-6">
                    <div className="bg-card border rounded-xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                        {text ? (
                            <div ref={canvasRef} className="p-4 bg-white rounded-lg shadow-sm border">
                                <QRCodeCanvas
                                    value={text}
                                    size={Math.min(size, 300)} // Preview size cap
                                    level={"H"}
                                    includeMargin={true}
                                    fgColor={fgColor}
                                    bgColor={bgColor}
                                />
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground space-y-2 opacity-50">
                                <div className="h-32 w-32 mx-auto border-2 border-dashed border-current rounded-lg flex items-center justify-center">
                                    <Type className="h-12 w-12" />
                                </div>
                                <p className="text-sm">Enter content to generate</p>
                            </div>
                        )}

                        {text && (
                            <Button className="mt-8 w-full max-w-xs" onClick={downloadQrCode}>
                                <Download className="h-4 w-4 mr-2" /> Download PNG
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* SEO Content */}
            <div className="mt-16 prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Generate Free Static QR Codes</h2>
                <p>
                    QR Codes (Quick Response Codes) have become the bridge between the physical and digital worlds.
                    From restaurant menus to Wi-Fi sharing, they are ubiquitous.
                    <strong>UnitMaster QR Generator</strong> allows you to create high-resolution, static codes instantly.
                </p>

                <h3>Static vs. Dynamic QR Codes</h3>
                <p>
                    It is important to understand the difference:
                </p>
                <ul>
                    <li><strong>Static (What we offer)</strong>: The data (like your URL) is embedded directly into the pattern of the code. It is permanent and will work forever. It does not rely on any third-party redirection service.</li>
                    <li><strong>Dynamic</strong>: The code points to a redirection URL owned by a service provider. If that service goes down or starts charging fees, your printed codes break.</li>
                </ul>
                <p>
                    We exclusively generate <strong>Static Codes</strong>. This means you own your code. Even if UnitMaster disappears tomorrow, your printed QR codes will continue to scan perfectly.
                </p>

                <h3>Privacy & Security</h3>
                <p>
                    Many "free" QR generators track your users. They insert a redirect link that collects analytics (location, device, time) before sending the user to your actual destination.
                    <strong>We do not do this.</strong>
                </p>
                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary my-6 not-prose">
                    <p className="text-sm">
                        <strong>🛡️ Zero Tracking:</strong> The Code is generated locally in your browser using JavaScript. The final URL in the code is exactly what you typed. No middlemen. No tracking scripts.
                    </p>
                </div>

                <h3>Best Practices for Printing</h3>
                <ol>
                    <li><strong>Size Matters</strong>: Ensure your code is at least 2cm x 2cm (0.8" x 0.8") for reliable scanning.</li>
                    <li><strong>Contrast</strong>: Always maintain high contrast. A black code on a white background is the gold standard.</li>
                    <li><strong>Whitespace</strong>: Leave a "quiet zone" (margin) around the code. If you crop too close to the dots, scanners might fail to detect it.</li>
                </ol>

                <h3>Common Uses</h3>
                <ul>
                    <li><strong>Wi-Fi Access</strong>: Share your guest Wi-Fi network without reading out a long password.</li>
                    <li><strong>Contact Cards (vCard)</strong>: Put a code on your business card that instantly saves your contact info to a phone.</li>
                    <li><strong>Product Packaging</strong>: Link customers to your instruction manual or support page.</li>
                </ul>
            </div>
        </div>
    );
}
