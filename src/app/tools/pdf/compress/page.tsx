import type { Metadata } from 'next';
import CompressPDFClient from './client';

export const metadata: Metadata = {
    title: 'Compress PDF Online - Reduce File Size Free | UnitMaster',
    description: 'Reduce PDF file size instantly without quality loss. Free, secure, and processing happens locally in your browser. Optimize docs for email and web.',
    keywords: ['compress pdf', 'reduce pdf size', 'optimize pdf', 'pdf shrinker', 'free pdf tools', 'online pdf compressor'],
    alternates: {
        canonical: 'https://unitmaster.io/tools/pdf/compress',
    },
    openGraph: {
        title: 'Compress PDF Online (Reduce File Size)',
        description: 'Shrink PDF files instantly in your browser. No server uploads required.',
        url: 'https://unitmaster.io/tools/pdf/compress',
        type: 'website',
    },
};

export default function CompressPDFPage() {
    return (
        <div className="space-y-12">
            <div className="text-center space-y-4 pt-8">
                <h1 className="text-3xl font-bold">Compress PDF</h1>
                <p className="text-muted-foreground">Optimize document structure to reduce file size. Best for text-heavy documents.</p>
            </div>

            <CompressPDFClient />

            {/* Content / SEO Section */}
            <div className="container mx-auto px-4 max-w-4xl space-y-16 py-12">
                <div className="prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                    <h2>Compress PDF File Size Online</h2>
                    <p>
                        Email attachments have size limits. Websites have upload caps. Storage space isn't infinite.
                        <strong>UnitMaster PDF Compressor</strong> solves these problems by intelligently optimizing the internal structure of your PDF files to reduce their size without destroying their readability.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-lg">How Does PDF Compression Work?</h4>
                            <p className="text-muted-foreground mt-2">
                                A PDF file is more than just text and images; it's a complex database of objects, fonts, and metadata. Our compression engine focuses on <strong>structural optimization</strong>:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2 text-muted-foreground">
                                <li><strong>Object Streams</strong>: We group small PDF objects together into compressed streams.</li>
                                <li><strong>Metadata Stripping</strong>: We remove unnecessary editing history, thumbnails, and bloated metadata that doesn't affect the visual content.</li>
                                <li><strong>Font Subsetting</strong>: (In supported files) We ensure only the characters actually used in the document are embedded.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg">Lossless vs. Lossy Compression</h4>
                            <p className="text-muted-foreground mt-2">
                                Most online tools rely on heavy <em>lossy</em> compression—they take your crisp images and blur them to save space.
                                UnitMaster prioritizes <strong>integrity</strong>. Our default mode is "Safe Compression," which focuses on reducing file overhead while keeping your text sharp and your images clear.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg">Is my data secure?</h4>
                            <p className="text-muted-foreground mt-2">
                                Yes. Just like all our tools, this compressor runs <strong>locally in your browser</strong>.
                                We do not upload your sensitive financial reports or legal contracts to any server to compress them.
                                You get the speed of a native desktop app with the convenience of the web.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">More Questions</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <h3 className="font-semibold">Best Practices for Small PDFs</h3>
                            <p className="text-sm text-muted-foreground">Scan at 150 DPI instead of 300+. Use "Save as PDF" instead of "Print to PDF" for cleaner code.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Does it work on Mac?</h3>
                            <p className="text-sm text-muted-foreground">Yes, it works on any device with a modern browser.</p>
                        </div>
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'UnitMaster PDF Compressor',
                        applicationCategory: 'UtilitiesApplication',
                        operatingSystem: 'Any',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD'
                        },
                        featureList: 'PDF compression, structural optimization, metadata cleaning',
                    }),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'How does UnitMaster compress PDFs?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'We use structural optimization, including object stream compression, metadata stripping, and font subsetting, to reduce file size without compromising quality.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is PDF compression lossy or lossless?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'UnitMaster uses "Safe Compression" (lossless/near-lossless) by default, optimizing file structure rather than degrading image quality.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is it safe to compress sensitive PDFs here?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. All compression happens locally in your browser. Your files are never uploaded to our servers, ensuring 100% privacy.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </div>
    );
}
