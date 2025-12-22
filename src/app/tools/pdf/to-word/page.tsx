import type { Metadata } from 'next';
import PdfToWordClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

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
    return (
        <>
            <PdfToWordClient />

            <SeoContentSection
                title="What is the PDF to Word OCR Tool?"
                description={`
                    <p>The <strong>UnitMaster PDF to Word Converter</strong> is a free, privacy-focused tool that uses <strong>Optical Character Recognition (OCR)</strong> to extract editable text from scanned PDF documents and images.</p>
                    <p class="mt-4">Unlike other converters that upload your files to the cloud, our tool runs <strong>locally in your browser</strong>, ensuring your sensitive data never leaves your device.</p>
                `}
                features={[
                    {
                        title: "Instant Extraction",
                        description: "Powered by Tesseract.js, our OCR engine runs directly in your browser. No server uploads, no waiting in queues."
                    },
                    {
                        title: "100% Private",
                        description: "Your sensitive documents never leave your device. We process everything locally using WebAssembly."
                    },
                    {
                        title: "Editable Text",
                        description: "Get clean, plain text that you can copy, edit, or save as a .txt file. Perfect for digitizing notes or invoices."
                    }
                ]}
                benefits={[
                    "Convert Scanned PDFs to Editable Text",
                    "Support for English and major languages",
                    "Extract text from Images (JPG, PNG)",
                    "Works 100% Offline"
                ]}
                faqs={[
                    {
                        question: "How accurate is the OCR?",
                        answer: "Accuracy depends on the quality of the source image. Clear, high-contrast scans of typed text typically yield 95-99% accuracy. Handwriting or low-resolution images may require manual corrections."
                    },
                    {
                        question: "Is my data secure?",
                        answer: "Yes. Unlike other online converters, we do not upload your files to a cloud server. The OCR process runs entirely on your computer's processor (CPU), ensuring your documents remain private."
                    },
                    {
                        question: "Supported file types?",
                        answer: "We currently support standard image formats (JPG, PNG, BMP) and PDF documents. For multi-page PDFs, we process them one page at a time (or as a batch in the Pro version)."
                    }
                ]}
                jsonLd={{
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
                }}
            />
        </>
    );
}
