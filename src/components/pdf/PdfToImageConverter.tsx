'use client';

import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import JSZip from 'jszip';
import { FileUploader } from '@/components/tools/FileUploader';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Image as ImageIcon, CheckCircle, Settings2 } from 'lucide-react';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type ImageFormat = 'png' | 'jpeg';

export default function PdfToImageConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);
    const [downloadFilename, setDownloadFilename] = useState<string>('');
    const [numPages, setNumPages] = useState<number>(0);
    const [format, setFormat] = useState<ImageFormat>('png');

    // We keep track of rendering status
    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

    const handleFileSelected = (newFiles: File[]) => {
        if (newFiles.length > 0) {
            setFile(newFiles[0]);
            setProcessedUrl(null);
            setNumPages(0);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        canvasRefs.current = Array(numPages).fill(null);
    };

    const convertToImages = async () => {
        if (!file || numPages === 0) return;
        setIsProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjs.getDocument({
                data: arrayBuffer,
                cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                cMapPacked: true,
            });
            const pdfDoc = await loadingTask.promise;

            const zip = new JSZip();
            const imagesFolder = zip.folder("images");

            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 }); // High quality

                const canvas = document.createElement('canvas'); // Off-screen canvas
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                const context = canvas.getContext('2d');

                if (context) {
                    await page.render({
                        canvasContext: context,
                        viewport: viewport,
                    } as any).promise;

                    // Convert to blob
                    const blob = await new Promise<Blob | null>(resolve =>
                        canvas.toBlob(resolve, `image/${format}`)
                    );

                    if (blob && imagesFolder) {
                        const ext = format === 'jpeg' ? 'jpg' : 'png';
                        // Pad numbers for sorting: page-001.png
                        const pageNum = String(i).padStart(3, '0');
                        imagesFolder.file(`page-${pageNum}.${ext}`, blob);
                    }
                }
            }

            // Generate ZIP
            const content = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(content);
            setProcessedUrl(url);
            setDownloadFilename(`${file.name.replace('.pdf', '')}-images.zip`);

        } catch (error) {
            console.error("Conversion failed", error);
            alert("Failed to convert PDF to images.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-bold">PDF to Image</h1>
                <p className="text-muted-foreground">Convert PDF pages to high-quality PNG or JPG images.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                {!file ? (
                    <FileUploader
                        onFilesSelected={handleFileSelected}
                        maxFiles={1}
                        acceptedFileTypes={{ 'application/pdf': ['.pdf'] }}
                        description="Upload PDF to Convert"
                        className="h-64"
                    />
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 bg-secondary/30 rounded-2xl border border-border/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl">
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-semibold">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                                            {numPages > 0 && <span>{numPages} Pages</span>}
                                        </Document>
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => { setFile(null); setProcessedUrl(null); setNumPages(0); }}
                                className="text-destructive hover:bg-destructive/10"
                            >
                                Change File
                            </Button>
                        </div>

                        <div className="flex items-center gap-4 p-4 border border-border rounded-xl">
                            <Settings2 className="w-5 h-5 text-muted-foreground" />
                            <span className="font-medium">Output Format:</span>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant={format === 'png' ? 'default' : 'outline'}
                                    onClick={() => setFormat('png')}
                                >
                                    PNG
                                </Button>
                                <Button
                                    size="sm"
                                    variant={format === 'jpeg' ? 'default' : 'outline'}
                                    onClick={() => setFormat('jpeg')}
                                >
                                    JPG
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            {!processedUrl ? (
                                <Button
                                    size="lg"
                                    onClick={convertToImages}
                                    disabled={isProcessing || numPages === 0}
                                    className="min-w-[200px]"
                                >
                                    {isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {isProcessing ? "Converting..." : "Convert to Images"}
                                </Button>
                            ) : (
                                <div className="text-center animate-in fade-in zoom-in">
                                    <div className="inline-flex p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-4">Conversion Complete!</h3>
                                    <a href={processedUrl} download={downloadFilename}>
                                        <Button size="lg" className="shadow-lg shadow-primary/20">
                                            <Download className="w-5 h-5 mr-2" />
                                            Download ZIP
                                        </Button>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="prose dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                <h2>Extract Images from PDF</h2>
                <p>Turn every page of your PDF document into a high-resolution image file. Perfect for sharing on social media or inserting into presentations.</p>
            </div>
        </div>
    );
}
