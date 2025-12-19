import type { Metadata } from 'next';
import MergePDFClient from './client';

export const metadata: Metadata = {
    title: 'Merge PDF Files Online - Free & Secure | UnitMaster',
    description: 'Combine multiple PDFs into one file instantly. Private, client-side processing with no file uploads. Merge unlimited files with Pro.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger', 'free pdf tools', 'secure pdf merge'],
    alternates: {
        canonical: 'https://unitmaster.io/tools/pdf/merge',
    },
    openGraph: {
        title: 'Merge PDF Files (Private & Secure)',
        description: 'Combine PDFs instantly in your browser. No server uploads.',
        url: 'https://unitmaster.io/tools/pdf/merge',
        type: 'website',
    },
};

export default function MergePDFPage() {
    return (
        <div className="space-y-12">
            <MergePDFClient />

            <div className="container mx-auto px-4 max-w-4xl space-y-16 py-12">

                {/* How To Section */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-center">How to Merge PDF Files Online</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                            <h3 className="font-semibold mb-2">Upload Files</h3>
                            <p className="text-sm text-muted-foreground">Select your PDF documents from your computer or drag and drop them into the box.</p>
                        </div>
                        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                            <h3 className="font-semibold mb-2">Reorder</h3>
                            <p className="text-sm text-muted-foreground">Drag the thumbnails to rearrange pages in the exact order you want them to appear.</p>
                        </div>
                        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                            <h3 className="font-semibold mb-2">Merge & Download</h3>
                            <p className="text-sm text-muted-foreground">Click "Merge PDF" and instantly download your combined document.</p>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <h3>Why Combine PDFs?</h3>
                    <p>
                        Keeping track of multiple files can be a nightmare. Whether you are a student submitting an assignment, a professional compiling a report, or just organizing personal receipts, merging PDFs is the best way to keep data together.
                    </p>
                    <p>
                        UnitMaster provides a <strong>secure, client-side</strong> solution. Unlike other tools that upload your private contracts to a remote server, our PDF Merger runs entirely in your browser using WebAssembly. This means your data never leaves your device—it's as safe as editing a file on your desktop.
                    </p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>100% Private</strong>: No server uploads. Zero risk of data leaks.</li>
                        <li><strong>Fast Processing</strong>: Merges happen instantly on your device, regardless of your internet speed.</li>
                        <li><strong>Easy Reordering</strong>: Visual drag-and-drop interface makes organizing pages simple.</li>
                    </ul>
                </div>

                {/* FAQ */}
                <div className="border-t border-border pt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <h3 className="font-semibold">Is there a file size limit?</h3>
                            <p className="text-sm text-muted-foreground">Because we process files on your device, the only limit is your computer's memory (RAM). Most modern devices can handle hundreds of megabytes easily.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Can I merge encrypted/password-protected PDFs?</h3>
                            <p className="text-sm text-muted-foreground">You will need to unlock the PDF (remove the password) before merging it. We cannot process encrypted files for security reasons.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Does it work on Mac and Windows?</h3>
                            <p className="text-sm text-muted-foreground">Yes! UnitMaster works in any modern browser (Chrome, Safari, Edge, Firefox) on Mac, Windows, Linux, and even mobile devices.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Can I merge PDF and Images?</h3>
                            <p className="text-sm text-muted-foreground">Currently, this tool supports PDF-to-PDF merging. Use our "Images to PDF" tool first if you need to combine JPEGs into a document.</p>
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
                        name: 'UnitMaster PDF Merger',
                        applicationCategory: 'UtilitiesApplication',
                        operatingSystem: 'Any',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD'
                        },
                        featureList: 'Merge multiple PDF files, Drag and drop reordering, Client-side processing',
                    }),
                }}
            />
            {/* Kept existing FAQ Schema but visually rendered it above too */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'Is UnitMaster PDF Merger safe for sensitive documents?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, it is 100% safe. The merging process runs locally in your browser, meaning your files are never uploaded to any server.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do I rearrange the order of my PDFs?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Simply drag and drop the file thumbnails in the list to change their sequence before clicking Merge.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </div>
    );
}
