'use client';

import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download, Link as LinkIcon, Type } from 'lucide-react';
import { toast } from 'sonner';

export default function QrCodeGeneratorPage() {
    const [text, setText] = useState('');
    const [size, setSize] = useState(256);
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

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
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
                <h2>Free QR Code Generator</h2>
                <p>
                    Generate permanent, high-quality QR codes for your business, events, or personal use.
                    This tool runs entirely in your browser using HTML5 Canvas technology, ensuring your data remains private and secure.
                </p>
                <h3>Features</h3>
                <ul>
                    <li><strong>Instant Generation</strong>: No loading times or server requests.</li>
                    <li><strong>Private</strong>: Data is processed locally on your device.</li>
                    <li><strong>Customizable</strong>: Adjust resolution size up to 1024px.</li>
                </ul>
            </div>
        </div>
    );
}
