'use client';

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument, rgb } from 'pdf-lib-plus-encrypt';
import { Document, Page, pdfjs } from 'react-pdf';
import { Rnd } from 'react-rnd';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Upload, Download, Trash2, X, Plus, EyeOff, Lock, AlertTriangle, Shield } from 'lucide-react';
import { mapToPdfCoordinates } from '@/lib/utils/coordinates';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

// Worker setup for react-pdf
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface RedactionBox {
    id: string;
    pageIndex: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function RedactPdfClient({ isPro }: { isPro: boolean }) {
    const [file, setFile] = useState<File | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [redactions, setRedactions] = useState<RedactionBox[]>([]);
    const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [scale, setScale] = useState(1.0);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    // Page container refs to calculate coordinates
    const pageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

    const checkUsageLimit = () => {
        if (isPro) return true;

        const STORAGE_KEY = 'unitmaster_redact_daily_limit';
        const today = new Date().toDateString();

        try {
            const usageData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            const currentCount = usageData.date === today ? (usageData.count || 0) : 0;
            const DAILY_LIMIT = 3;

            if (currentCount >= DAILY_LIMIT) {
                setShowUpgradeModal(true);
                return false;
            }
            return true;
        } catch (e) {
            return true;
        }
    };

    const incrementUsage = () => {
        if (isPro) return;
        const STORAGE_KEY = 'unitmaster_redact_daily_limit';
        const today = new Date().toDateString();

        const usageData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const currentCount = usageData.date === today ? (usageData.count || 0) : 0;

        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            date: today,
            count: currentCount + 1
        }));
    };

    const onDrop = (acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0];
        if (uploadedFile && uploadedFile.type === 'application/pdf') {
            setFile(uploadedFile);
            setRedactions([]);
        } else {
            toast.error('Please upload a valid PDF file.');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const addRedactionBox = (pageIndex: number = 0) => {
        const newBox: RedactionBox = {
            id: crypto.randomUUID(),
            pageIndex,
            x: 50,
            y: 50,
            width: 200,
            height: 50,
        };
        setRedactions([...redactions, newBox]);
        setSelectedBoxId(newBox.id);
    };

    const updateBox = (id: string, d: Partial<RedactionBox>) => {
        setRedactions(prev => prev.map(box => box.id === id ? { ...box, ...d } : box));
    };

    const removeBox = (id: string) => {
        setRedactions(prev => prev.filter(b => b.id !== id));
        setSelectedBoxId(null);
    };

    const handleDownload = async () => {
        if (!file || redactions.length === 0) {
            toast.error("Please add at least one redaction box.");
            return;
        }

        // Check Usage Limit before proceeding
        if (!checkUsageLimit()) return;

        setIsProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPages();

            // 1. Draw Black Boxes (Standard Redaction)
            for (const box of redactions) {
                const page = pages[box.pageIndex];
                const { width: pdfPageWidth, height: pdfPageHeight } = page.getSize();

                const pageEl = pageContainerRefs.current[box.pageIndex];
                if (!pageEl) continue;

                const { x, y, width, height } = mapToPdfCoordinates(
                    box.x,
                    box.y,
                    box.width,
                    box.height,
                    pdfPageWidth,
                    pdfPageHeight,
                    pageEl.clientWidth,
                    pageEl.clientHeight
                );

                page.drawRectangle({
                    x,
                    y,
                    width,
                    height,
                    color: rgb(0, 0, 0),
                });
            }

            // NOTE: Watermark logic removed. Providing clean outputs for free tier (up to limit).

            const pdfBytes = await pdfDoc.save();
            // Cast to any for Blob compatibility in some envs
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `redacted_${file.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Increment usage after successful download
            incrementUsage();

            toast.success('PDF Redacted Successfully!');

        } catch (error) {
            console.error(error);
            toast.error('Failed to redact PDF.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!file) {
        return (
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors min-h-[400px] flex flex-col items-center justify-center
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                    <div className="p-6 bg-red-100 dark:bg-red-900/20 rounded-full text-red-600">
                        <EyeOff className="h-10 w-10" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Drop Confidential PDF here</h3>
                        <p className="text-muted-foreground">or click to browse</p>
                    </div>
                    <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> 100% Local Processing</span>
                        <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> No Uploads</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Upgrade Modal */}
            <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogTitle className="text-center text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
                        Upgrade to UnitMaster Pro
                    </DialogTitle>
                    <div className="text-center space-y-4 py-4">
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full w-fit mx-auto">
                            <Lock className="w-8 h-8 text-orange-500" />
                        </div>
                        <DialogDescription className="text-center text-base">
                            You have reached the daily limit of 3 free redacted documents.
                            Upgrade to Pro for unlimited secure redaction.
                        </DialogDescription>
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-0" onClick={() => window.location.href = '/pricing'}>
                            Unlock Unlimited Access
                        </Button>
                        <Button variant="ghost" onClick={() => setShowUpgradeModal(false)} className="w-full">
                            Maybe Later
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="space-y-6">
                <Card className="p-4 space-y-4 sticky top-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate w-32" title={file.name}>{file.name}</h3>
                        <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="p-4 bg-secondary/50 rounded-lg text-sm space-y-2">
                        <p className="font-medium flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            How to Redact
                        </p>
                        <p className="text-muted-foreground text-xs">
                            1. Scroll to the page.
                            <br />
                            2. Click "Add Box".
                            <br />
                            3. Drag/Resize the box over text.
                        </p>
                    </div>

                    <Button variant="outline" className="w-full justify-start" onClick={() => addRedactionBox(0)}>
                        <Plus className="h-4 w-4 mr-2" /> Add Redaction Box
                    </Button>

                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleDownload} disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                        Apply Redactions
                    </Button>
                </Card>
            </div>

            <div className="lg:col-span-3 bg-secondary/30 rounded-xl p-8 min-h-[600px] overflow-auto flex justify-center">
                <Document
                    file={file}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    className="space-y-8"
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <div
                            key={`page_${index + 1}`}
                            className="relative shadow-lg group"
                            ref={el => { pageContainerRefs.current[index] = el }}
                        >
                            <div className="absolute -left-12 top-0 text-xs text-muted-foreground font-mono">
                                P.{index + 1}
                            </div>

                            {/* Toolbar for specific page */}
                            <div className="absolute -top-10 right-0 hidden group-hover:flex">
                                <Button size="sm" variant="secondary" onClick={() => addRedactionBox(index)}>
                                    <Plus className="w-3 h-3 mr-1" /> Redact Here
                                </Button>
                            </div>

                            <Page
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                scale={scale}
                            />

                            {/* Overlay Layout */}
                            <div className="absolute inset-0 pointer-events-none">
                                {redactions.filter(b => b.pageIndex === index).map(box => (
                                    <Rnd
                                        key={box.id}
                                        default={{
                                            x: box.x,
                                            y: box.y,
                                            width: box.width,
                                            height: box.height,
                                        }}
                                        minWidth={20}
                                        minHeight={20}
                                        bounds="parent"
                                        className={`pointer-events-auto border-2 ${selectedBoxId === box.id ? 'border-red-600 bg-red-500/40' : 'border-red-500/50 bg-black/80'}`}
                                        onDragStop={(e, d) => updateBox(box.id, { x: d.x, y: d.y })}
                                        onResizeStop={(e, direction, ref, delta, position) => {
                                            updateBox(box.id, {
                                                width: parseInt(ref.style.width),
                                                height: parseInt(ref.style.height),
                                                ...position,
                                            });
                                        }}
                                        onClick={() => setSelectedBoxId(box.id)}
                                    >
                                        <div className="w-full h-full relative group">
                                            {selectedBoxId === box.id && (
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute -top-3 -right-3 h-6 w-6 rounded-full"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeBox(box.id);
                                                    }}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            )}
                                        </div>
                                    </Rnd>
                                ))}
                            </div>
                        </div>
                    ))}
                </Document>
            </div>
        </div>
    );
}
