'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib-plus-encrypt';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/button';
import { Download, Scissors, Loader2, FileText, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { usePro } from '@/hooks/usePro';
import { toast } from 'sonner';

export default function SplitPDFClient() {
    const { isPro } = usePro();
    const [file, setFile] = useState<File | null>(null);
    const [pageCount, setPageCount] = useState<number>(0);
    const [selectedPages, setSelectedPages] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedPdfUrl, setProcessedPdfUrl] = useState<string | null>(null);

    const handleFileSelected = async (newFiles: File[]) => {
        if (newFiles.length > 0) {
            const f = newFiles[0];
            setFile(f);
            setProcessedPdfUrl(null);

            try {
                const arrayBuffer = await f.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                setPageCount(pdf.getPageCount());
                setSelectedPages(`1-${pdf.getPageCount()}`);
            } catch (e) {
                console.error("Failed to load PDF", e);
                alert("Invalid PDF file");
                setFile(null);
            }
        }
    };

    const parsePageRange = (range: string, max: number): number[] => {
        const pages = new Set<number>();
        const parts = range.split(',');

        for (const part of parts) {
            const p = part.trim();
            if (p.includes('-')) {
                const [start, end] = p.split('-').map(Number);
                if (!isNaN(start) && !isNaN(end)) {
                    for (let i = start; i <= end; i++) {
                        if (i >= 1 && i <= max) pages.add(i - 1);
                    }
                }
            } else {
                const num = Number(p);
                if (!isNaN(num) && num >= 1 && num <= max) {
                    pages.add(num - 1);
                }
            }
        }
        return Array.from(pages).sort((a, b) => a - b);
    };

    const splitPDF = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            // Artificial Delay for Free Users
            if (!isPro) {
                await new Promise(resolve => setTimeout(resolve, 30000));
            }

            const arrayBuffer = await file.arrayBuffer();
            const srcDoc = await PDFDocument.load(arrayBuffer);
            const newDoc = await PDFDocument.create();

            const indicesToKeep = parsePageRange(selectedPages, pageCount);

            if (indicesToKeep.length === 0) {
                alert("Please select valid pages to extract.");
                setIsProcessing(false);
                return;
            }

            // Freemium Logic: Check for non-contiguous ranges (gaps)
            if (!isPro && indicesToKeep.length > 1) {
                let isContiguous = true;
                for (let i = 0; i < indicesToKeep.length - 1; i++) {
                    if (indicesToKeep[i + 1] !== indicesToKeep[i] + 1) {
                        isContiguous = false;
                        break;
                    }
                }

                if (!isContiguous) {
                    toast.error("Multi-range extraction is a Pro feature", {
                        description: "Free users can only extract a single continuous block of pages.",
                        action: {
                            label: "Upgrade",
                            onClick: () => window.location.href = '/pricing'
                        }
                    });
                    setIsProcessing(false);
                    return;
                }
            }

            const copiedPages = await newDoc.copyPages(srcDoc, indicesToKeep);
            copiedPages.forEach((page) => newDoc.addPage(page));

            const pdfBytes = await newDoc.save();
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setProcessedPdfUrl(url);
        } catch (error) {
            console.error('Error splitting PDF:', error);
            alert('Failed to split PDF.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
            {!file ? (
                <FileUploader
                    onFilesSelected={handleFileSelected}
                    maxFiles={1}
                    acceptedFileTypes={{ 'application/pdf': ['.pdf'] }}
                    description="Drag & drop a PDF to split"
                    className="h-64"
                />
            ) : (
                <div className="space-y-8">
                    <div className="flex items-center justify-between p-6 bg-secondary/30 rounded-2xl border border-border/50">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-semibold truncate max-w-[200px]">{file.name}</p>
                                <p className="text-sm text-muted-foreground">{pageCount} Pages • {(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setFile(null); setProcessedPdfUrl(null); }}
                            className="text-destructive hover:bg-destructive/10"
                        >
                            Change File
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-foreground mb-2 block">Pages to Extract</label>
                            <input
                                type="text"
                                value={selectedPages}
                                onChange={(e) => setSelectedPages(e.target.value)}
                                className="w-full p-4 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all font-mono text-lg"
                                placeholder="Example: 1-5, 8, 11-13"
                            />
                            {!isPro && (
                                <div className="flex items-center gap-2 mt-2 text-xs text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                                    <Lock className="w-3 h-3" />
                                    <span>Free Limit: Single continuous range only (e.g., 1-5). <Link href="/pricing" className="underline font-semibold hover:text-amber-700">Upgrade for multi-range.</Link></span>
                                </div>
                            )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Use hyphens for ranges (e.g. <strong>1-5</strong>)</li>
                                <li>Use commas for single pages (e.g. <strong>1, 3, 5</strong>)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Area */}
            {(file || processedPdfUrl) && (
                <div className="flex flex-col items-center justify-center p-8 bg-secondary/30 rounded-3xl border border-dashed border-border/50 min-h-[200px] mt-8">
                    {isProcessing ? (
                        <div className="text-center w-full max-w-md">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-2">
                                {isPro ? 'Extracting Pages...' : 'Free Tier Processing...'}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {isPro ? 'Processing your requests instanty.' : 'Your request is in the free queue standard wait time is 30s. Upgrade to Pro to skip.'}
                            </p>
                            <div className="h-2 w-full bg-border overflow-hidden rounded-full">
                                <div className="h-full bg-primary animate-progress origin-left"></div>
                            </div>
                        </div>
                    ) : processedPdfUrl ? (
                        <div className="text-center w-full animate-in fade-in zoom-in duration-300">
                            <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Done!</h3>
                            <p className="text-muted-foreground mb-8">Your extracted PDF is ready.</p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={processedPdfUrl} download={`split-${file?.name || 'document'}.pdf`} className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full sm:w-auto text-lg h-14 rounded-xl shadow-lg shadow-primary/20">
                                        <Download className="w-5 h-5 mr-2" />
                                        Download PDF
                                    </Button>
                                </a>
                                <Button variant="outline" size="lg" onClick={() => setProcessedPdfUrl(null)} className="h-14 rounded-xl">
                                    Split Again
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            size="lg"
                            onClick={splitPDF}
                            disabled={!file}
                            className="text-lg px-8 h-14 rounded-xl shadow-lg shadow-primary/20 w-full sm:w-auto"
                        >
                            <Scissors className="w-5 h-5 mr-2" />
                            Extract Pages
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
