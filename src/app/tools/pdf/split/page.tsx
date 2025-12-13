
'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Scissors, Loader2, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { AdUnit } from '@/components/AdUnit';

export default function SplitPDFPage() {
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
            const arrayBuffer = await file.arrayBuffer();
            const srcDoc = await PDFDocument.load(arrayBuffer);
            const newDoc = await PDFDocument.create();

            const indicesToKeep = parsePageRange(selectedPages, pageCount);

            if (indicesToKeep.length === 0) {
                alert("Please select valid pages to extract.");
                setIsProcessing(false);
                return;
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
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold">Split PDF</h1>
                <p className="text-muted-foreground">Extract specific pages from your PDF document securely.</p>
            </div>

            {/* Workspace */}
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
            </div>

            {/* Action Area */}
            {(file || processedPdfUrl) && (
                <div className="flex flex-col items-center justify-center p-8 bg-secondary/30 rounded-3xl border border-dashed border-border/50 min-h-[200px]">
                    {isProcessing ? (
                        <div className="text-center w-full max-w-md">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-2">Extracting Pages...</h3>
                            <p className="text-muted-foreground mb-6">Processing your requests...</p>
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

            {/* Content / SEO Section */}
            <div className="prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Split PDF Pages Without Losing Quality</h2>
                <p>
                    Large PDF documents can be unwieldy. Whether you need to extract a single chapter from an ebook, pull a specific invoice from a yearly report, or just break a massive file into manageable chunks,
                    <strong>UnitMaster PDF Splitter</strong> is the precise tool for the job.
                </p>

                <h3>How Our Browser-Based Splitter Works</h3>
                <p>
                    Data privacy is critical when handling documents. Unlike other services that force you to upload your files to a cloud server to "process" them, UnitMaster operates differently.
                    We use a specialized JavaScript engine that loads your PDF <strong>directly into your browser's memory</strong>.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary my-6 not-prose">
                    <p className="text-sm">
                        <strong>🔒 Security Guarantee:</strong> Your file never leaves your computer. The "splitting" happens on your own CPU. This makes it safe for legal contracts, medical records, and financial statements.
                    </p>
                </div>

                <h3>Ways to Extract Pages</h3>
                <p>
                    Our smart range selector gives you flexible control over exactly what gets extracted:
                </p>
                <ul>
                    <li><strong>Single Pages</strong>: Type <code>5</code> to extract just page 5.</li>
                    <li><strong>Ranges</strong>: Type <code>1-5</code> to extract the first five pages.</li>
                    <li><strong>Complex Combinations</strong>: Type <code>1-3, 5, 8-10</code> to mix and match ranges and single pages into a new custom document.</li>
                </ul>

                <h3>Why Split PDF Files?</h3>
                <ul>
                    <li><strong>Efficiency</strong>: Don't email a 50MB report when the recipient only needs 3 pages.</li>
                    <li><strong>Organization</strong>: Break down scanned books into individual chapters for easier reading.</li>
                    <li><strong>Correction</strong>: Remove accidental blank pages or error pages from a final document.</li>
                </ul>

                <h3>Features</h3>
                <ul>
                    <li><strong>Real-time Preview</strong>: See the page count and file size before you split.</li>
                    <li><strong>Instant Download</strong>: No queue, no waiting, no registration required.</li>
                    <li><strong>Cross-Platform</strong>: Works securely on Windows, Mac, Linux, and even mobile browsers.</li>
                </ul>
            </div>
        </div>
    );
}
