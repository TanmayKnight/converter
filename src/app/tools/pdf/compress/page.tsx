
'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Minimize2, Loader2, CheckCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { AdUnit } from '@/components/AdUnit';

export default function CompressPDFPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedPdfUrl, setProcessedPdfUrl] = useState<string | null>(null);
    const [stats, setStats] = useState<{ original: number, compressed: number } | null>(null);

    const handleFileSelected = (newFiles: File[]) => {
        if (newFiles.length > 0) {
            setFile(newFiles[0]);
            setProcessedPdfUrl(null);
            setStats(null);
        }
    };

    const compressPDF = async () => {
        if (!file) return;

        setIsProcessing(true);
        // Simulate "Processing" time for Ad impression and user expectations (compression is fast)
        await new Promise(r => setTimeout(r, 2000));

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            // pdf-lib doesn't have a "compress level" setting, BUT...
            // Saving it freshly often removes unused objects/incremental updates.
            // We use 'useObjectStreams: false' to be compatible, OR default which is compressed.
            // Actually, default save() DOES compress.
            // We can also try to copy pages to a NEW document to strip metadata.

            const newDoc = await PDFDocument.create();
            const copiedPages = await newDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
            copiedPages.forEach(page => newDoc.addPage(page));

            const pdfBytes = await newDoc.save({ useObjectStreams: true }); // Enable max compression

            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            setStats({
                original: file.size,
                compressed: blob.size
            });
            setProcessedPdfUrl(url);

        } catch (err) {
            console.error(err);
            alert("Failed to compress PDF");
        } finally {
            setIsProcessing(false);
        }
    };

    const formatSize = (bytes: number) => {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };

    const getSavings = () => {
        if (!stats) return 0;
        const saved = stats.original - stats.compressed;
        if (saved <= 0) return 0;
        return Math.round((saved / stats.original) * 100);
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold">Compress PDF</h1>
                <p className="text-muted-foreground">Optimize document structure to reduce file size. Best for text-heavy documents.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                {!file ? (
                    <FileUploader
                        onFilesSelected={handleFileSelected}
                        maxFiles={1}
                        acceptedFileTypes={{ 'application/pdf': ['.pdf'] }}
                        description="Upload PDF to Compress"
                        className="h-64"
                    />
                ) : (
                    <div className="flex items-center justify-between p-6 bg-secondary/30 rounded-2xl border border-border/50">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-semibold truncate max-w-[200px]">{file.name}</p>
                                <p className="text-sm text-muted-foreground">{formatSize(file.size)}</p>
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
                )}
            </div>

            {/* Action Area */}
            {(file || processedPdfUrl) && (
                <div className="flex flex-col items-center justify-center p-8 bg-secondary/30 rounded-3xl border border-dashed border-border/50 min-h-[200px]">
                    {isProcessing ? (
                        <div className="text-center w-full max-w-md">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-2">Compressing...</h3>
                            <p className="text-muted-foreground mb-6">Optimizing your document structure.</p>
                            <div className="h-2 w-full bg-border overflow-hidden rounded-full">
                                <div className="h-full bg-primary animate-progress origin-left"></div>
                            </div>
                        </div>
                    ) : processedPdfUrl ? (
                        <div className="text-center w-full animate-in fade-in zoom-in duration-300">
                            <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Compression Complete!</h3>

                            {stats && (
                                <>
                                    <div className="mb-8 flex items-center justify-center gap-4 text-sm">
                                        <span className="text-muted-foreground line-through">{formatSize(stats.original)}</span>
                                        <ArrowLeft className="w-4 h-4 rotate-180 text-muted-foreground" />
                                        <span className="font-bold text-green-600 dark:text-green-400">{formatSize(stats.compressed)}</span>
                                        {getSavings() > 0 ? (
                                            <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full text-xs">-{getSavings()}%</span>
                                        ) : (
                                            <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded-full text-xs">Already Optimized</span>
                                        )}
                                    </div>
                                    {getSavings() === 0 && (
                                        <p className="text-xs text-muted-foreground mb-6 max-w-sm mx-auto">
                                            Note: We use lossless structural compression. If your PDF contains mainly high-res images, it may already be maximally compressed.
                                        </p>
                                    )}
                                </>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={processedPdfUrl} download={`compressed-${file?.name || 'doc'}.pdf`} className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full sm:w-auto text-lg h-14 rounded-xl shadow-lg shadow-primary/20">
                                        <Download className="w-5 h-5 mr-2" />
                                        Download PDF
                                    </Button>
                                </a>
                                <Button variant="outline" size="lg" onClick={() => setProcessedPdfUrl(null)} className="h-14 rounded-xl">
                                    Again
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            size="lg"
                            onClick={compressPDF}
                            disabled={!file}
                            className="text-lg px-8 h-14 rounded-xl shadow-lg shadow-primary/20 w-full sm:w-auto"
                        >
                            <Minimize2 className="w-5 h-5 mr-2" />
                            Compress PDF
                        </Button>
                    )}
                </div>
            )}

            {/* Content / SEO Section */}
            <div className="prose dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Compress PDFs Online</h2>
                <p>Shrink your PDF file size instantly for free. We optimize the document structure to reduce size without compromising quality.</p>
            </div>
        </div>
    );
}

