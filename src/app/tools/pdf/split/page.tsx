import type { Metadata } from 'next';
import SplitPDFClient from './client';

export const metadata: Metadata = {
    title: 'Split PDF Online - Extract Pages Free | UnitMaster',
    description: 'Extract pages from PDF files instantly. Free, secure, and runs locally. Save specific pages or split documents without uploading.',
    keywords: ['split pdf', 'extract pdf pages', 'separate pdf', 'pdf cutter', 'free pdf splitter'],
    alternates: {
        canonical: 'https://unitmaster.io/tools/pdf/split',
    },
    openGraph: {
        title: 'Split PDF Online (Extract Pages)',
        description: 'Extract specific pages from your PDF securely in your browser.',
        url: 'https://unitmaster.io/tools/pdf/split',
        type: 'website',
    },
};

export default function SplitPDFPage() {
    return (
        <div className="space-y-12">
            <div className="text-center space-y-4 pt-8">
                <h1 className="text-3xl font-bold">Split PDF</h1>
                <p className="text-muted-foreground">Extract specific pages from your PDF document securely.</p>
            </div>

            <SplitPDFClient />

            {/* Rich Content Section */}
            <div className="container mx-auto px-4 max-w-4xl space-y-16 py-12">
                {/* How To Section */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-center">How to Split PDF Files</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                            <h3 className="font-semibold mb-2">Upload File</h3>
                            <p className="text-sm text-muted-foreground">Select your PDF document. The tool will instantly count the pages.</p>
                        </div>
                        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                            <h3 className="font-semibold mb-2">Select Pages</h3>
                            <p className="text-sm text-muted-foreground">Enter the page numbers (e.g. "1-5" or "1,3,5") you want to keep.</p>
                        </div>
                        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                            <h3 className="font-semibold mb-2">Extract</h3>
                            <p className="text-sm text-muted-foreground">Click "Extract Pages" to get a new PDF containing only the selected pages.</p>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <h3>Split PDF Pages Without Losing Quality</h3>
                    <p>
                        Large PDF documents can be unwieldy. Whether you need to extract a single chapter from an ebook, pull a specific invoice from a yearly report, or just break a massive file into manageable chunks,
                        <strong>UnitMaster PDF Splitter</strong> is the precise tool for the job.
                    </p>

                    <h3>Security First</h3>
                    <p>
                        Data privacy is critical when handling documents. Unlike other services that force you to upload your files to a cloud server to "process" them, UnitMaster operates differently.
                        <strong>Your file never leaves your computer.</strong> The "splitting" happens on your own CPU in your browser's local memory using advanced WebAssembly technology.
                    </p>
                </div>

                {/* FAQ */}
                <div className="border-t border-border pt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <h3 className="font-semibold">How do I select specific pages?</h3>
                            <p className="text-sm text-muted-foreground">Use the input box to type the pages you want. Use hyphens for ranges (e.g., <code>1-10</code>) and commas for single pages (e.g., <code>5, 12</code>).</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Can I split multiple files at once?</h3>
                            <p className="text-sm text-muted-foreground">Currently, we support splitting one file at a time to ensure maximum browser performance and accuracy.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Will the quality decrease?</h3>
                            <p className="text-sm text-muted-foreground">No. We perform a "lossless" copy of the pages you select into a new container. Text, images, and formatting remain identical to the original.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Is it free?</h3>
                            <p className="text-sm text-muted-foreground">Yes! Basic single-range extraction is 100% free. Complex multi-range extraction (cutting multiple different sections at once) is a Pro feature.</p>
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
                        name: 'UnitMaster Split PDF',
                        applicationCategory: 'UtilitiesApplication',
                        operatingSystem: 'Any',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD'
                        },
                        featureList: 'Split PDF pages, secure local processing, range extraction',
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
                                name: 'Is the PDF split process secure?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. The splitting process occurs entirely within your browser\'s local memory. Your files are not uploaded to any external server.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: ' How can I extract specific pages?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'You can extract pages by entering single numbers (e.g., "5") or ranges (e.g., "1-5"). You can also combine them (e.g., "1-3, 5, 7").'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Can I split large PDF files?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, because the processing happens on your device, you are not limited by server upload caps, making it easier to handle larger files.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </div>
    );
}
