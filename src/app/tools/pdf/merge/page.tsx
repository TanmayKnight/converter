
'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUploader, SelectedFileList } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Layers, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { AdUnit } from '@/components/AdUnit';

export default function MergePDFPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedPdfUrl, setProcessedPdfUrl] = useState<string | null>(null);

    const handleFilesSelected = (newFiles: File[]) => {
        setFiles(prev => [...prev, ...newFiles]);
        setProcessedPdfUrl(null); // Reset result
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setProcessedPdfUrl(null);
    };

    const mergePDFs = async () => {
        if (files.length < 2) return;

        setIsProcessing(true);
        try {
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setProcessedPdfUrl(url);
        } catch (error) {
            console.error('Error merging PDFs:', error);
            alert('Failed to merge PDFs. Please try again with valid PDF files.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold">Merge PDF Files</h1>
                <p className="text-muted-foreground">Combine multiple PDF documents into a single file. Free, private, and 100% client-side.</p>
            </div>

            {/* Main Workspace Card */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <FileUploader
                    onFilesSelected={handleFilesSelected}
                    acceptedFileTypes={{ 'application/pdf': ['.pdf'] }}
                    description="Drag & drop PDFs here to combine them"
                    className="h-64"
                />

                {(files.length > 0) && (
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-sm text-foreground/70 uppercase tracking-wider">
                                Selected Files ({files.length})
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setFiles([])}
                                className="text-destructive hover:bg-destructive/10 h-8"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Clear All
                            </Button>
                        </div>
                        <SelectedFileList files={files} onRemove={removeFile} />
                    </div>
                )}
            </div>

            {/* Action Area */}
            <div className="flex flex-col items-center justify-center p-8 bg-secondary/30 rounded-3xl border border-dashed border-border/50 min-h-[200px]">
                {isProcessing ? (
                    <div className="text-center w-full max-w-md">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-bold mb-2">Processing Your Files</h3>
                        <p className="text-muted-foreground mb-6">Merging documents securely in your browser...</p>
                        <div className="h-2 w-full bg-border overflow-hidden rounded-full">
                            <div className="h-full bg-primary animate-progress origin-left"></div>
                        </div>
                    </div>
                ) : processedPdfUrl ? (
                    <div className="text-center w-full animate-in fade-in zoom-in duration-300">
                        <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
                            <Download className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Ready to Download</h3>
                        <p className="text-muted-foreground mb-8">Your files have been successfully merged.</p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href={processedPdfUrl} download="merged-document.pdf" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto text-lg h-14 rounded-xl shadow-lg shadow-primary/20">
                                    <Download className="w-5 h-5 mr-2" />
                                    Download PDF
                                </Button>
                            </a>
                            <Button variant="outline" size="lg" onClick={() => setProcessedPdfUrl(null)} className="h-14 rounded-xl">
                                Start Over
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <Button
                            size="lg"
                            onClick={mergePDFs}
                            disabled={files.length < 2}
                            className="text-lg px-8 h-14 rounded-xl shadow-lg shadow-primary/20 min-w-[200px]"
                        >
                            <Layers className="w-5 h-5 mr-2" />
                            {files.length < 2 ? 'Add Files to Merge' : 'Merge PDF Files'}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">
                            {files.length === 0 ? 'Select files to begin' : files.length === 1 ? 'Add at least one more file' : 'Ready to merge'}
                        </p>
                    </div>
                )}
            </div>

            {/* Content / SEO Section */}
            <div className="prose dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Merge PDFs Instantly</h2>
                <p>UnitMaster provides a secure way to combine multiple PDF documents. Because we process files locally, there are no file size limits imposed by a server.</p>
                <h3>How to use?</h3>
                <ul>
                    <li>Upload your PDF files.</li>
                    <li>Drag and drop to reorder.</li>
                    <li>Click "Merge" to combine them.</li>
                </ul>
            </div>
        </div>
    );
}
