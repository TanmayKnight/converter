'use client';

import { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import { Document, Page, pdfjs } from 'react-pdf';
import { Rnd } from 'react-rnd';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Upload, Download, PenTool, Type, Image as ImageIcon, Trash2, X, Calendar, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SignaturePad } from '@/components/tools/pdf/SignatureV2/SignaturePad';
import { mapToPdfCoordinates } from '@/lib/utils/coordinates';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface SignatureElement {
    id: string;
    type: 'draw' | 'type' | 'image';
    content: string; // DataURL or Text
    x: number;
    y: number;
    width: number;
    height: number;
    pageIndex: number;
}

export function SignPdfClient({ isPro }: { isPro: boolean }) {
    const [file, setFile] = useState<File | null>(null);
    const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [signatures, setSignatures] = useState<SignatureElement[]>([]);
    const [selectedSignatureId, setSelectedSignatureId] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDrawOpen, setIsDrawOpen] = useState(false);
    const [activePage, setActivePage] = useState<any>(null); // To get page size for new sig
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [typedSignature, setTypedSignature] = useState('');
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    // Layout State
    const [scale, setScale] = useState(1.0);
    const pageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

    const checkUsageLimit = () => {
        if (isPro) return true;

        const STORAGE_KEY = 'unitmaster_sign_daily_limit';
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
            // If storage fails, fallback to allow (safe fail)
            return true;
        }
    };

    const incrementUsage = () => {
        if (isPro) return;
        const STORAGE_KEY = 'unitmaster_sign_daily_limit';
        const today = new Date().toDateString();

        const usageData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const currentCount = usageData.date === today ? (usageData.count || 0) : 0;

        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            date: today,
            count: currentCount + 1
        }));
    };

    const onDrop = async (acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0];
        if (uploadedFile && uploadedFile.type === 'application/pdf') {
            setFile(uploadedFile);
            const arrayBuffer = await uploadedFile.arrayBuffer();
            const doc = await PDFDocument.load(arrayBuffer);
            setPdfDoc(doc);
            setSignatures([]);
        } else {
            toast.error('Please upload a valid PDF file.');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const removeFile = () => {
        setFile(null);
        setPdfDoc(null);
        setNumPages(0);
        setSignatures([]);
    };

    const addSignature = (type: 'draw' | 'type' | 'image', content: string) => {
        // Add to center of currently visible page (or first page)
        // For MV1, just add to Page 1 center
        const newSig: SignatureElement = {
            id: crypto.randomUUID(),
            type,
            content,
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            pageIndex: 0 // Default to Page 1
        };
        setSignatures([...signatures, newSig]);
    };

    const updateSignaturePosition = (id: string, d: { x: number, y: number, width: number, height: number }) => {
        setSignatures(prev => prev.map(sig =>
            sig.id === id ? { ...sig, ...d } : sig
        ));
    };

    const removeSignature = (id: string) => {
        setSignatures(prev => prev.filter(s => s.id !== id));
        setSelectedSignatureId(null);
    };

    const handleDownload = async () => {
        if (!pdfDoc || !file) return;

        // Check Usage Limit before proceeding
        if (!checkUsageLimit()) return;

        setIsProcessing(true);

        try {
            // Embed signatures
            const pages = pdfDoc.getPages();

            for (const sig of signatures) {
                const page = pages[sig.pageIndex];
                const { width: pdfPageWidth, height: pdfPageHeight } = page.getSize();

                // Get rendered dimensions of this page from DOM
                const pageEl = pageContainerRefs.current[sig.pageIndex];
                if (!pageEl) continue;

                // The actual canvas/container size
                const renderWidth = pageEl.clientWidth;
                const renderHeight = pageEl.clientHeight;

                // Map Coordinates
                const { x, y, width, height } = mapToPdfCoordinates(
                    sig.x,
                    sig.y,
                    sig.width,
                    sig.height,
                    pdfPageWidth,
                    pdfPageHeight,
                    renderWidth,
                    renderHeight
                );

                if (sig.type === 'draw' || sig.type === 'image') {
                    const img = await pdfDoc.embedPng(sig.content);
                    page.drawImage(img, {
                        x,
                        y, // bottom-left based (calculated in utils)
                        width,
                        height
                    });
                }
                // Text embedding later...
            }

            const pdfBytes = await pdfDoc.save();
            // Use 'as any' to bypass strict TS check if Uint8Array isn't matched to BlobPart in this env
            // This preserves the binary data correctly.
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `signed_${file.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Increment usage after successful download
            incrementUsage();

            toast.success('PDF Signed Successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to sign PDF.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Placeholder View for when no file
    if (!file) {
        return (
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-secondary rounded-full">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Drop your PDF here</h3>
                        <p className="text-muted-foreground">or click to browse files</p>
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
                            You have reached the daily limit of 3 free signed documents.
                            Upgrade to Pro for unlimited signing and advanced features.
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

            {/* Sidebar Controls */}
            <div className="space-y-6">
                <Card className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate w-32" title={file.name}>{file.name}</h3>
                        <Button variant="ghost" size="icon" onClick={removeFile}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                            <Dialog open={isDrawOpen} onOpenChange={setIsDrawOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="flex flex-col h-20 gap-2 w-full">
                                        <PenTool className="h-5 w-5" />
                                        <span className="text-xs">Draw</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                    <div className="sr-only">
                                        <DialogTitle>Draw Signature</DialogTitle>
                                        <DialogDescription>Use your mouse or finger to draw your signature below.</DialogDescription>
                                    </div>
                                    <SignaturePad
                                        onSave={(dataUrl) => {
                                            if (activePage) {
                                                const pageSize = activePage.getSize();
                                                addSignature('draw', dataUrl);
                                            } else {
                                                addSignature('draw', dataUrl);
                                            }
                                            setIsDrawOpen(false);
                                        }}
                                        onCancel={() => setIsDrawOpen(false)}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="col-span-1">
                            <Dialog open={isTypeOpen} onOpenChange={setIsTypeOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="flex flex-col h-20 gap-2 w-full">
                                        <Type className="h-5 w-5" />
                                        <span className="text-xs">Type</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                    <div className="sr-only">
                                        <DialogTitle>Type Signature</DialogTitle>
                                        <DialogDescription>Type your name to generate a signature.</DialogDescription>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-center">Type Your Name</h3>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded-md text-2xl font-handwriting text-center"
                                            placeholder="John Doe"
                                            value={typedSignature}
                                            onChange={(e) => setTypedSignature(e.target.value)}
                                        />
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" onClick={() => setIsTypeOpen(false)}>Cancel</Button>
                                            <Button onClick={() => {
                                                if (!typedSignature.trim()) return;

                                                // Convert text to image logic
                                                const canvas = document.createElement('canvas');
                                                const ctx = canvas.getContext('2d');
                                                if (ctx) {
                                                    canvas.width = 400;
                                                    canvas.height = 100;
                                                    ctx.font = '48px cursive'; // Simple cursive font
                                                    ctx.fillStyle = 'black';
                                                    ctx.textAlign = 'center';
                                                    ctx.textBaseline = 'middle';
                                                    ctx.fillText(typedSignature, canvas.width / 2, canvas.height / 2);

                                                    const dataUrl = canvas.toDataURL('image/png');
                                                    addSignature('draw', dataUrl); // We treat typed sigs as 'draw' (images) for simplicity in rendering
                                                }
                                                setIsTypeOpen(false);
                                                setTypedSignature('');
                                            }}>Add Signature</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="col-span-1 relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            if (e.target?.result as string) {
                                                addSignature('image', e.target!.result as string);
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                    // Reset value so same file can be selected again
                                    e.target.value = '';
                                }}
                            />
                            <Button variant="outline" className="flex flex-col h-20 gap-2 w-full">
                                <ImageIcon className="h-5 w-5" />
                                <span className="text-xs">Image</span>
                            </Button>
                        </div>

                        <Button
                            variant="outline"
                            className="flex flex-col h-20 gap-2"
                            onClick={() => {
                                const dateStr = new Date().toLocaleDateString();
                                // Create canvas for text
                                const canvas = document.createElement('canvas');
                                const ctx = canvas.getContext('2d');
                                if (ctx) {
                                    canvas.width = 200;
                                    canvas.height = 50;
                                    ctx.font = '24px sans-serif';
                                    ctx.fillStyle = 'black';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(dateStr, canvas.width / 2, canvas.height / 2);

                                    const dataUrl = canvas.toDataURL('image/png');
                                    addSignature('draw', dataUrl);
                                }
                            }}
                        >
                            <Calendar className="h-5 w-5" />
                            <span className="text-xs">Date</span>
                        </Button>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleDownload} disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                        Download Signed PDF
                    </Button>
                </Card>
            </div>

            {/* Editing Area */}
            <div className="lg:col-span-3 bg-secondary/30 rounded-xl p-8 min-h-[600px] overflow-auto flex justify-center">
                <Document
                    file={file}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    className="space-y-8"
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <div
                            key={`page_${index + 1}`}
                            className="relative shadow-lg"
                            ref={el => { pageContainerRefs.current[index] = el }}
                        >
                            <Page
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                scale={scale}
                            />
                            {/* Overlay Layout for Signatures on THIS page */}
                            <div className="absolute inset-0 pointer-events-none">
                                {signatures.filter(s => s.pageIndex === index).map(sig => (
                                    <Rnd
                                        key={sig.id}
                                        default={{
                                            x: sig.x,
                                            y: sig.y,
                                            width: sig.width,
                                            height: sig.height,
                                        }}
                                        minWidth={50}
                                        minHeight={25}
                                        bounds="parent"
                                        className={`pointer-events-auto border-2 ${selectedSignatureId === sig.id ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                                        onDragStop={(e, d) => updateSignaturePosition(sig.id, { ...sig, x: d.x, y: d.y })}
                                        onResizeStop={(e, direction, ref, delta, position) => {
                                            updateSignaturePosition(sig.id, {
                                                ...sig,
                                                width: parseInt(ref.style.width),
                                                height: parseInt(ref.style.height),
                                                ...position,
                                            });
                                        }}
                                        onClick={() => setSelectedSignatureId(sig.id)}
                                    >
                                        <div className="w-full h-full relative group bg-white/20 backdrop-blur-sm">
                                            {/* Render Actual Image */}
                                            {(sig.type === 'draw' || sig.type === 'image') ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={sig.content}
                                                    alt="Signature"
                                                    className="w-full h-full object-contain pointer-events-none select-none"
                                                    draggable={false}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-red-500/20 flex items-center justify-center text-xs">
                                                    {sig.content}
                                                </div>
                                            )}
                                            {selectedSignatureId === sig.id && (
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute -top-3 -right-3 h-6 w-6 rounded-full"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeSignature(sig.id);
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
