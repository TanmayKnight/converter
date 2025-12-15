import type { Metadata } from 'next';
import PdfToWordClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Zap, Lock, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
    title: 'PDF to Word Converter (OCR) - Edit Scanned PDFs | UnitMaster',
    description: 'Convert scanned PDF documents and images to editable Text/Word files instantly. 100% free, private, and runs locally in your browser with OCR.',
    keywords: ['pdf to word', 'ocr online', 'convert scanned pdf to text', 'image to text', 'extract text from pdf'],
    alternates: {
        canonical: '/tools/pdf/to-word',
    },
    openGraph: {
        title: 'PDF to Word Converter (OCR) - Edit Scanned PDFs',
        description: 'Convert scanned PDF documents and images to editable Text/Word files instantly. 100% free, private, and runs locally with OCR.',
        type: 'website',
        url: '/tools/pdf/to-word',
    },
};

export default function PdfToWordPage() {
    // Structured Data for AI/SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster PDF to Word OCR',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Free online OCR tool to convert scanned PDFs and images into editable text. Runs locally in browser using Tesseract.js.',
        featureList: 'OCR text extraction, Client-side processing, Image support, PDF support',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '120',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <PdfToWordClient />

            {/* SEO Content (Server Rendered) */}
            <div className="container mx-auto px-4 max-w-6xl mt-24 mb-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why use UnitMaster OCR?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Stop retyping documents manually. Our AI-powered OCR engine extracts text from images and PDFs in seconds.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                        <div className="h-12 w-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Instant Extraction</h3>
                        <p className="text-muted-foreground">
                            Powered by Tesseract.js, our OCR engine runs directly in your browser. No server uploads, no waiting in queues.
                        </p>
                    </div>

                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                        <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">100% Private</h3>
                        <p className="text-muted-foreground">
                            Your sensitive documents never leave your device. We process everything locally using WebAssembly.
                        </p>
                    </div>

                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                        <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6">
                            <RefreshCw className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Editable Text</h3>
                        <p className="text-muted-foreground">
                            Get clean, plain text that you can copy, edit, or save as a .txt file. Perfect for digitizing notes or invoices.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl mb-24">
                <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-2xl p-2 shadow-sm">
                    <AccordionItem value="item-1" className="border-b-0 mb-2 px-2">
                        <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">How accurate is the OCR?</AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                            Accuracy depends on the quality of the source image. Clear, high-contrast scans of typed text typically yield 95-99% accuracy. Handwriting or low-resolution images may require manual corrections.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-b-0 mb-2 px-2">
                        <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">Is my data secure?</AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                            Yes. Unlike other online converters, we do not upload your files to a cloud server. The OCR process runs entirely on your computer&apos;s processor (CPU), ensuring your documents remain private.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-b-0 px-2">
                        <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">Supported file types?</AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                            We currently support standard image formats (JPG, PNG, BMP) and PDF documents. For multi-page PDFs, we process them one page at a time (or as a batch in the Pro version).
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'How do I convert scanned PDF to text?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Upload your scanned PDF or image to UnitMaster OCR. The tool will scan the document locally and extract the text for you to copy or download.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is UnitMaster OCR free?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, our OCR tool is 100% free with no daily limits on conversions.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Are my documents stored?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No. Your documents are processed in your browser&apos;s memory and are discarded immediately after you close the tab.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
