'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib-plus-encrypt';
import { FileUploader, SelectedFileList } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Layers, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { AdUnit } from '@/components/AdUnit';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePro } from '@/hooks/usePro';
import { ProGate } from '@/components/ui/pro-gate';

export default function MergePDFClient() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedPdfUrl, setProcessedPdfUrl] = useState<string | null>(null);
    const [showPaywall, setShowPaywall] = useState(false);
    const { isPro } = usePro();

    const handleFilesSelected = (newFiles: File[]) => {
        // Limit free users to 2 files (Resume + Cover Letter is fine, adds upsell for Portfolio)
        if (!isPro && (files.length + newFiles.length) > 2) {
            setShowPaywall(true);
            return;
        }
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
            // Artificial Delay for Free Users (The "Friction" Strategy)
            if (!isPro) {
                // User requested 30s pain
                await new Promise(resolve => setTimeout(resolve, 30000));
            }

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
            {/* Header moved to Server Component for SEO */}

            {/* Main Workspace Card */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">

                {showPaywall ? (
                    <div className="max-w-xl mx-auto py-12">
                        <ProGate
                            isPro={isPro}
                            title="Batch Merge Unlimited Files"
                            description="Free users are limited to merging 2 files at a time. Upgrade to Pro to merge unlimited documents."
                            blurAmount="lg"
                        >
                            <div className="flex flex-col items-center justify-center space-y-4 opacity-40">
                                <Layers className="h-16 w-16 text-muted-foreground" />
                                <div className="space-y-2 text-center">
                                    <h3 className="font-semibold text-lg">Adding 4th file...</h3>
                                </div>
                            </div>
                        </ProGate>
                        <div className="text-center mt-6">
                            <Button variant="ghost" onClick={() => setShowPaywall(false)}>
                                Back to files
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </div>

            {/* Action Area */}
            <div className="flex flex-col items-center justify-center p-8 bg-secondary/30 rounded-3xl border border-dashed border-border/50 min-h-[200px]">
                {isProcessing ? (
                    <div className="text-center w-full max-w-md">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-bold mb-2">
                            {isPro ? 'Processing...' : 'Free Tier Processing...'}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            {isPro ? 'Merging your files instantly.' : 'Your files are being queued. Upgrade to Pro for instant processing.'}
                        </p>
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
            <div className="prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>How to Merge PDF Files Online (Free & Private)</h2>
                <p>
                    Merging multiple PDF documents into a single file is essential for organizing reports, combining agreements, or cleaning up your digital workspace.
                    <strong>UnitMaster PDF Merger</strong> allows free users to combine up to 2 files. Upgrade to Pro for unlimited batch merging and instant processing.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why is this tool safer than others?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Most online PDF tools require you to upload your sensitive documents (tax returns, legal contracts) to a remote server.
                                    This creates a risk of data breaches.
                                </p>
                                <p>
                                    We take a radically different approach. Our tool runs <strong>entirely on your device</strong>. The merging engine is downloaded to your browser,
                                    meaning your files never leave your computer. It is physically impossible for us to view your documents.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Key Features</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Unlimited Files (Pro)</strong>: Free users can merge 2 files. Pro users can merge 200+. We don&apos;t impose artificial limits on Pro accounts.</li>
                                    <li><strong>Drag & Drop Reordering</strong>: Easily arrange your documents in the exact order you need.</li>
                                    <li><strong>Instant Processing (Pro)</strong>: Pro users skip the queue. A 50MB merge takes milliseconds.</li>
                                    <li><strong>Clean Output</strong>: We don&apos;t add watermarks to your professional documents.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>How do I combine files?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li><strong>Select Files</strong>: Drop your PDFs into the upload zone or click to select from your computer.</li>
                                    <li><strong>Arrange</strong>: Drag the file thumbnails to reorder them. The top-left file will be the first pages of your new document.</li>
                                    <li><strong>Merge</strong>: Click the &quot;Merge PDF Files&quot; button.</li>
                                    <li><strong>Save</strong>: Your new document is ready instantly. Click &quot;Download PDF&quot; to save it.</li>
                                </ol>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>Who needs to merge PDFs?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Job Applications</strong>: Combine your Resume and Cover Letter into one professional attachment.</li>
                                    <li><strong>Invoices & Receipts</strong>: Merge monthly expense receipts into a single file for your accountant.</li>
                                    <li><strong>Project Reports</strong>: Combine individual chapter PDFs into a final thesis or report.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div >
    );
}
