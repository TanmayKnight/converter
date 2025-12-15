'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createWorker } from 'tesseract.js';
import { ImageDropzone } from '@/components/image-tools/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Download, Loader2, Copy, RefreshCw, FileType, AlignLeft, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function PdfToWordClient() {
    const [file, setFile] = useState<File | null>(null);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<string>('Ready');
    const [error, setError] = useState<string | null>(null);

    // Tesseract worker reference
    const workerRef = useRef<Tesseract.Worker | null>(null);

    useEffect(() => {
        // Cleanup worker on unmount
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, []);

    const onSelectFile = useCallback((selectedFile: File) => {
        if (!selectedFile.type.includes('image') && selectedFile.type !== 'application/pdf') {
            setError("Please upload an image (PNG, JPG) or PDF file.");
            return;
        }

        setFile(selectedFile);
        setError(null);
        setExtractedText('');
        setProgress(0);
        setStatus('Ready');

        if (selectedFile.type.includes('image')) {
            const reader = new FileReader();
            reader.onload = (e) => setPreviewSrc(e.target?.result as string);
            reader.readAsDataURL(selectedFile);
        } else {
            // PDF Preview (Use icon for now, rendering first page as preview is optional/advanced)
            setPreviewSrc(null);
        }
    }, []);

    const processPdf = async (pdfFile: File, worker: Tesseract.Worker) => {
        // Dynamically import PDF.js to avoid build issues with server-side rendering/webpack
        const pdfjs = await import('pdfjs-dist');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(pdfjs as any).GlobalWorkerOptions.workerSrc) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pdfjs as any).GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        }

        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        const totalPages = pdf.numPages;

        for (let i = 1; i <= totalPages; i++) {
            setStatus(`Processing Page ${i} of ${totalPages}...`);
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2.0 }); // 2.0 scale for better OCR accuracy

            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const context = canvas.getContext('2d');

            if (context) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await page.render({ canvasContext: context, viewport } as any).promise;

                // Convert canvas to blob for Tesseract
                const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));

                if (blob) {
                    const ret = await worker.recognize(blob);

                    // Add Page break marker if multiple pages
                    if (totalPages > 1) {
                        fullText += `--- Page ${i} ---\n\n`;
                    }
                    fullText += ret.data.text + '\n\n';
                }
            }
            // Update pseudo-progress for PDF
            setProgress(Math.round((i / totalPages) * 100));
        }
        return fullText;
    };

    const handleOCR = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        setExtractedText('');

        try {
            if (!workerRef.current) {
                setStatus('Loading OCR Engine...');
                const worker = await createWorker('eng', 1, {
                    logger: m => {
                        // Only log progress for Image OCR. For PDF, we manage progress manually.
                        if (file.type.includes('image') && m.status === 'recognizing text') {
                            setProgress(Math.round(m.progress * 100));
                            setStatus(`Scanning... ${Math.round(m.progress * 100)}%`);
                        }
                    }
                });
                workerRef.current = worker;
            }

            setStatus('Processing...');
            let text = '';

            if (file.type === 'application/pdf') {
                text = await processPdf(file, workerRef.current);
            } else {
                const ret = await workerRef.current.recognize(file);
                text = ret.data.text;
            }

            setExtractedText(text);
            setStatus('Completed');
            toast.success("Text extracted successfully!");

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : "Failed to extract text.";
            setError(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(extractedText);
        toast.success("Copied to clipboard");
    };

    const downloadText = () => {
        const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `extracted_${file?.name}.txt`;
        link.click();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-24">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-orange-500/10 rounded-2xl mb-4">
                    <AlignLeft className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400">
                    PDF to Word (OCR)
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Convert scanned documents and images into editable text.
                    <br />
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 mt-2">
                        <Check className="w-3 h-3" /> 100% Private, Client-side Processing
                    </span>
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Input */}
                <div className="space-y-6">
                    <Card className="p-6 border-2 border-dashed border-border/50 shadow-sm min-h-[400px] flex flex-col">
                        {!file ? (
                            <div className="space-y-4">
                                <ImageDropzone
                                    onImageSelect={onSelectFile}
                                    description="Drag & drop document (Image or PDF)"
                                    accept={{
                                        'image/jpeg': [],
                                        'image/png': [],
                                        'image/webp': [],
                                        'application/pdf': ['.pdf']
                                    }}
                                    supportedFileTypes="Supports PDF, JPG, PNG, WEBP"
                                />
                                {error && (
                                    <Alert className="border-red-500/50 bg-red-500/10 text-red-500">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            {file.type === 'application/pdf' ? <FileType className="w-6 h-6 text-primary" /> : <AlignLeft className="w-6 h-6 text-primary" />}
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => { setFile(null); setExtractedText(''); setError(null); }}>
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Preview */}
                                <div className="flex-1 bg-secondary/20 rounded-xl overflow-hidden flex items-center justify-center border border-border relative">
                                    {previewSrc ? (
                                        <img src={previewSrc} alt="Preview" className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <div className="text-center p-8 text-muted-foreground">
                                            <FileType className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p>{file.type === 'application/pdf' ? 'PDF Document Ready' : 'Image Ready'}</p>
                                        </div>
                                    )}

                                    {isProcessing && (
                                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 transition-all">
                                            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                                            <h3 className="font-semibold text-lg">{status}</h3>
                                            {progress > 0 && <p className="text-sm font-mono">{progress}%</p>}
                                            <p className="text-sm text-muted-foreground">This happens locally on your device.</p>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <Alert className="border-red-500/50 bg-red-500/10 text-red-500">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <Button size="lg" className="w-full" onClick={handleOCR} disabled={isProcessing}>
                                    {isProcessing ? 'Processing Document...' : 'Start Extraction'}
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Right Column: Output */}
                <div className="space-y-6">
                    <Card className="p-6 h-full flex flex-col shadow-sm min-h-[400px]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <AlignLeft className="w-5 h-5 text-primary" /> Extracted Text
                            </h3>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!extractedText}>
                                    <Copy className="w-4 h-4 mr-2" /> Copy
                                </Button>
                                <Button size="sm" onClick={downloadText} disabled={!extractedText}>
                                    <Download className="w-4 h-4 mr-2" /> Save
                                </Button>
                            </div>
                        </div>

                        <Textarea
                            className="flex-1 min-h-[300px] font-mono text-sm leading-relaxed resize-none bg-secondary/10 focus-visible:ring-1"
                            placeholder="Text from your document will appear here..."
                            value={extractedText}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExtractedText(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                            You can edit the text above before saving.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
