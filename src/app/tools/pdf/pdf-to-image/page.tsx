'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PdfToImageConverter = dynamic(
    () => import('@/components/pdf/PdfToImageConverter'),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading converter...</span>
            </div>
        )
    }
);

export default function PdfToImagePage() {
    return (
        <div className="space-y-12">
            <PdfToImageConverter />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* How To Section */}
                <div className="space-y-8 mb-12">
                    <h2 className="text-3xl font-bold text-center">How to Convert PDF to Image</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                            <h3 className="font-semibold mb-2">Upload PDF</h3>
                            <p className="text-sm text-muted-foreground">Choose your file. All pages will be loaded instantly for preview.</p>
                        </div>
                        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                            <h3 className="font-semibold mb-2">Preview & Select</h3>
                            <p className="text-sm text-muted-foreground">Select the specific pages you want to turn into images.</p>
                        </div>
                        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                            <h3 className="font-semibold mb-2">Save as JPG/PNG</h3>
                            <p className="text-sm text-muted-foreground">Download single images or a ZIP file containing everything.</p>
                        </div>
                    </div>
                </div>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <h3>Convert PDF to High-Resolution Images</h3>
                    <p>
                        PDFs are great for documents, but terrible for sharing on social media or embedding in presentations.
                        <strong>UnitMaster</strong> converts each page of your PDF into a crisp, standalone image (JPG or PNG) that you can use anywhere.
                    </p>

                    <h3>Why Convert PDF to JPG/PNG?</h3>
                    <ul>
                        <li><strong>Social Media</strong>: You cannot upload a PDF to Instagram or Twitter. You need an image.</li>
                        <li><strong>Presentation Decks</strong>: Powerpoint and Keynote handle images much better than embedded PDFs.</li>
                        <li><strong>Quick Preview</strong>: Images load instantly on mobile devices without launching a separate PDF viewer app.</li>
                    </ul>

                    <h3>Understanding Quality (DPI)</h3>
                    <p>
                        The quality of your converted image depends on the <strong>DPI (Dots Per Inch)</strong>.
                    </p>
                    <ul>
                        <li><strong>72 DPI</strong>: Standard Screen resolution. Good for quick previews.</li>
                        <li><strong>150 DPI</strong>: Good for general web use and ebooks.</li>
                        <li><strong>300 DPI</strong>: Print quality. Necessary if you plan to print the resulting images.</li>
                    </ul>
                </div>

                {/* FAQ */}
                <div className="border-t border-border pt-12 mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <h3 className="font-semibold">Is it safe for confidential reports?</h3>
                            <p className="text-sm text-muted-foreground">Yes. Converting a 50-page confidential report? Do not upload it to a cloud converter. Our tool processes the rendering using your own computer's CPU. The conversion happens <strong>offline</strong> in your browser tab.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Does it handle large files?</h3>
                            <p className="text-sm text-muted-foreground">Since we don't upload your file, there is no server limit. You can convert gigabyte-sized PDFs as long as your device has enough RAM.</p>
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
                        name: 'UnitMaster PDF to Image',
                        applicationCategory: 'MultimediaApplication',
                        operatingSystem: 'Any',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD'
                        },
                        featureList: 'Convert PDF to JPG/PNG, Local Rendering, High Quality Output',
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
                                name: 'Why should I convert PDF to image?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Converting PDF to image is useful for sharing on social media (which doesn\'t support PDF), embedding in presentations, and enabling quick previews on mobile devices.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: ' What image quality (DPI) do I effectively get?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Our tool optimizes specifically for web and screen viewing (typically 150 DPI equivalent), ensuring text is sharp without creating unmanageably large files.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is the conversion process private?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. The conversion happens entirely offline in your browser using your computer\'s CPU, ensuring confidential documents are never sent to a server.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </div>
    );
}
