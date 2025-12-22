import type { Metadata } from 'next';
import MergePDFClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Merge PDF Files Offline - Private & Secure | UnitMaster',
    description: 'Combine multiple PDFs into one file instantly. Runs 100% offline in your browser. No server uploads. completely private.',
    keywords: ['merge pdf offline', 'combine pdf local', 'pdf merger no upload', 'secure pdf merge', 'privacy first pdf tool'],
    alternates: {
        canonical: '/tools/pdf/merge',
    },
    openGraph: {
        title: 'Merge PDF Files (Offline & Private)',
        description: 'Combine PDFs instantly in your browser. No server uploads.',
        url: '/tools/pdf/merge',
        type: 'website',
    },
};

export default function MergePDFPage() {
    return (
        <div className="space-y-12">
            <div className="container mx-auto px-4 max-w-4xl pt-8 text-center space-y-4">
                <h1 className="text-3xl font-bold">Merge PDF Files</h1>
                <p className="text-muted-foreground">Combine multiple PDF documents into a single file. Free, private, and 100% client-side.</p>
            </div>

            <MergePDFClient />

            <SeoContentSection
                title="How to Merge PDF Files Offline"
                description="Merge multiple PDF documents into a single file without uploading them to a cloud server. UnitMaster uses your browser's built-in PDF engine to combine files locally, ensuring 100% privacy for your sensitive contracts, reports, and receipts."
                features={[
                    {
                        title: "100% Private (No Server Uploads)",
                        description: "Your files never leave your device. All processing happens locally in your browser."
                    },
                    {
                        title: "Unlimited Files & Size",
                        description: "Since it runs on your machine, there are no artificial limits on file count or size."
                    },
                    {
                        title: "Drag & Drop Reordering",
                        description: "Easily arrange your PDF pages visually before merging them."
                    },
                    {
                        title: "Works Offline (PWA Support)",
                        description: "Install UnitMaster as an app and merge PDFs even without an internet connection."
                    }
                ]}
                benefits={[
                    "Your data never leaves your device.",
                    "Arrange pages exactly how you want them.",
                    "Instant processing - no upload wait times.",
                    "Free for commercial use."
                ]}
                faqs={[
                    {
                        question: "Is it safe to merge confidential PDFs here?",
                        answer: "Yes. Unlike other sites, UnitMaster does not upload your files to a server. The merging process happens entirely in your web browser using WebAssembly. It's as safe as using a desktop application."
                    },
                    {
                        question: "Is there a file size limit?",
                        answer: "No. Since we don't host your files, there are no artificial size limits. You are only limited by your device's memory (RAM)."
                    },
                    {
                        question: "Can I merge PDF and Images?",
                        answer: "This tool is for PDF-to-PDF merging. To combine images into a PDF, use our 'Image to PDF' tool from the menu."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "UnitMaster Offline PDF Merger",
                    "applicationCategory": "ProductivityApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Offline merging, Client-side privacy, Unlimited files"
                }}
            />
        </div>
    );
}
