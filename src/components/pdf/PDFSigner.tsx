'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib-plus-encrypt';
import { Document, Page, pdfjs } from 'react-pdf';
import { Rnd } from 'react-rnd';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/button';
import { Download, Loader2, CheckCircle, Eraser, Move, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
// Use the version exported by react-pdf to ensure compatibility
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFSigner() {
    const [file, setFile] = useState<File | null>(null);
    const [processedPdfUrl, setProcessedPdfUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Signature State
    const [signatureImage, setSignatureImage] = useState<string | null>(null);

    // Canvas Refs for Drawing
    const drawCanvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);

    // PDF Preview State
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageScale, setPageScale] = useState(1.0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Draggable Signature State
    const [sigPos, setSigPos] = useState({ x: 100, y: 100, width: 200, height: 100 });
    const [hasPlacedSignature, setHasPlacedSignature] = useState(false);

    // Signing Options
    const [applyToAllPages, setApplyToAllPages] = useState(false);

    // 1. Handle File Upload
    const handleFileSelected = (newFiles: File[]) => {
        if (newFiles.length > 0) {
            setFile(newFiles[0]);
            setProcessedPdfUrl(null);
            setSignatureImage(null);
            setHasPlacedSignature(false);
            setCurrentPage(1);
        }
    };

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    // 2. Signature Drawing Logic
    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = drawCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        isDrawing.current = true;
        const { offsetX, offsetY } = getCoordinates(e, canvas);
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing.current) return;
        const canvas = drawCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const { offsetX, offsetY } = getCoordinates(e, canvas);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        isDrawing.current = false;
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        // @ts-ignore
        if (e.touches && e.touches.length > 0) {
            const touch = (e as React.TouchEvent).touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            offsetX: (clientX - rect.left) * scaleX,
            offsetY: (clientY - rect.top) * scaleY
        };
    };

    const clearCanvas = () => {
        const canvas = drawCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setSignatureImage(null);
    };

    const saveSignature = () => {
        const canvas = drawCanvasRef.current;
        if (!canvas) return;
        setSignatureImage(canvas.toDataURL('image/png'));
        setHasPlacedSignature(true);
        setSigPos({ x: 100, y: 100, width: 200, height: 100 });
    };

    // 3. Final PDF Generation
    const signPDF = async () => {
        if (!file || !signatureImage) return;
        setIsProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const imageBytes = await fetch(signatureImage).then(res => res.arrayBuffer());
            const embeddedImage = await pdfDoc.embedPng(imageBytes);

            const pagesToSign = applyToAllPages
                ? pdfDoc.getPages().map((p, i) => ({ page: p, index: i }))
                : [{ page: pdfDoc.getPages()[currentPage - 1], index: currentPage - 1 }];

            // Dimensions logic
            // We use the DOM element to get the rendered size
            const pageElement = containerRef.current?.querySelector('.react-pdf__Page__canvas');

            if (pageElement) {
                const rect = pageElement.getBoundingClientRect();
                const renderedWidth = rect.width;
                const renderedHeight = rect.height;

                // Reference Page (PDF units)
                const refPage = pdfDoc.getPages()[currentPage - 1];
                const { width: pdfPageWidth, height: pdfPageHeight } = refPage.getSize();

                const scaleX = pdfPageWidth / renderedWidth;
                const scaleY = pdfPageHeight / renderedHeight;

                const pdfSigWidth = sigPos.width * scaleX;
                const pdfSigHeight = sigPos.height * scaleY;
                const pdfX = sigPos.x * scaleX;
                // PDF Y is inverted and 0,0 is bottom-left
                const pdfY = pdfPageHeight - (sigPos.y * scaleY) - pdfSigHeight;

                for (const { page } of pagesToSign) {
                    page.drawImage(embeddedImage, {
                        x: pdfX,
                        y: pdfY,
                        width: pdfSigWidth,
                        height: pdfSigHeight,
                    });
                }
            } else {
                // Should not happen if preview is visible
                console.warn("Could not determine page dimensions from DOM, using default scaling");
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setProcessedPdfUrl(url);

        } catch (err) {
            console.error(err);
            alert("Failed to sign PDF");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold">Sign PDF</h1>
                <p className="text-muted-foreground">Free, secure, and client-side PDF signing.</p>
            </div>

            {!file && (
                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                    <FileUploader
                        onFilesSelected={handleFileSelected}
                        maxFiles={1}
                        acceptedFileTypes={{ 'application/pdf': ['.pdf'] }}
                        description="Upload PDF to Sign"
                        className="h-64"
                    />
                </div>
            )}

            {file && !signatureImage && !processedPdfUrl && (
                <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold">Draw Your Signature</h3>
                            <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="text-destructive">Change File</Button>
                        </div>
                        <div className="border-2 border-dashed border-border rounded-xl bg-white dark:bg-zinc-800 touch-none relative overflow-hidden h-[200px]" style={{ cursor: 'crosshair' }}>
                            <canvas
                                ref={drawCanvasRef}
                                width={600}
                                height={200}
                                className="w-full h-full"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none">Sign Here</div>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                            <Button variant="outline" size="sm" onClick={clearCanvas}>
                                <Eraser className="w-4 h-4 mr-2" />
                                Clear
                            </Button>
                            <Button onClick={saveSignature} className="bg-primary text-primary-foreground">
                                Use Signature
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {file && signatureImage && !processedPdfUrl && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-medium">Page {currentPage} of {numPages || '--'}</span>
                            <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))} disabled={currentPage >= numPages}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => setPageScale(s => Math.max(0.5, s - 0.2))}>
                                    <ZoomOut className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-medium">{Math.round(pageScale * 100)}%</span>
                                <Button variant="outline" size="icon" onClick={() => setPageScale(s => Math.min(2.0, s + 0.2))}>
                                    <ZoomIn className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="h-6 w-px bg-border hidden md:block"></div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant={applyToAllPages ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setApplyToAllPages(!applyToAllPages)}
                                    className={applyToAllPages ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground"}
                                >
                                    <Layers className="w-4 h-4 mr-2" />
                                    {applyToAllPages ? "Apply to All Pages" : "Current Page Only"}
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => setSignatureImage(null)}>Redraw</Button>
                            <Button onClick={signPDF} disabled={isProcessing}>
                                {isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {isProcessing ? "Processing..." : "Sign & Download"}
                            </Button>
                        </div>
                    </div>

                    <div className="relative bg-secondary/20 p-8 rounded-xl border border-border flex justify-center min-h-[500px] overflow-auto">
                        <div ref={containerRef} className="relative shadow-xl">
                            <Document
                                file={file}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={<div className="flex items-center gap-2 p-4"><Loader2 className="animate-spin" /> Loading PDF...</div>}
                                error={<div className="text-destructive p-4">Failed to load PDF. Please try another file.</div>}
                            >
                                <Page
                                    pageNumber={currentPage}
                                    scale={pageScale}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                />
                            </Document>

                            {hasPlacedSignature && (
                                <Rnd
                                    size={{ width: sigPos.width, height: sigPos.height }}
                                    position={{ x: sigPos.x, y: sigPos.y }}
                                    onDragStop={(e, d) => setSigPos(prev => ({ ...prev, x: d.x, y: d.y }))}
                                    onResizeStop={(e, direction, ref, delta, position) => {
                                        setSigPos({
                                            width: parseInt(ref.style.width),
                                            height: parseInt(ref.style.height),
                                            ...position,
                                        });
                                    }}
                                    bounds="parent"
                                    className="border-2 border-primary border-dashed bg-primary/10 hover:bg-primary/20 transition-colors group z-50 cursor-move"
                                >
                                    <div className="w-full h-full relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={signatureImage}
                                            alt="Signature"
                                            className="w-full h-full object-contain pointer-events-none select-none"
                                        />
                                        <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 bg-primary text-white text-[10px] rounded-bl">
                                            <Move className="w-3 h-3" />
                                        </div>
                                    </div>
                                </Rnd>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {processedPdfUrl && (
                <div className="flex flex-col items-center justify-center p-8 bg-secondary/30 rounded-3xl border border-dashed border-border/50 min-h-[300px] animate-in fade-in zoom-in duration-300">
                    <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Signed Successfully</h3>
                    <p className="text-muted-foreground mb-8">
                        {applyToAllPages ? `Applied to all ${numPages} pages.` : `Applied to page ${currentPage}.`}
                    </p>

                    <div className="flex gap-4">
                        <a href={processedPdfUrl} download={`signed-${file?.name || 'doc'}.pdf`}>
                            <Button size="lg" className="h-12 px-8 rounded-xl shadow-lg shadow-primary/20">
                                <Download className="w-5 h-5 mr-2" />
                                Download PDF
                            </Button>
                        </a>
                        <Button variant="outline" size="lg" onClick={() => { setProcessedPdfUrl(null); }} className="h-12 rounded-xl">
                            Sign Another
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
