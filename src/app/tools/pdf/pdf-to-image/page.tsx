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
        <div className="space-y-8">
            <PdfToImageConverter />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Convert PDF to High-Resolution Images</h2>
                <p>
                    PDFs are great for documents, but terrible for sharing on social media or embedding in presentations.
                    <strong>UnitMaster</strong> converts each page of your PDF into a crisp, standalone image.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why Convert PDF to JPG/PNG?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Social Media</strong>: You cannot upload a PDF to Instagram or Twitter. You need an image.</li>
                                    <li><strong>Presentation Decks</strong>: Powerpoint and Keynote handle images much better than embedded PDFs.</li>
                                    <li><strong>Quick Preview</strong>: Images load instantly on mobile devices without launching a separate PDF viewer app.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Understanding Quality (DPI)</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    The quality of your converted image depends on the <strong>DPI (Dots Per Inch)</strong>.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>72 DPI</strong>: Standard Screen resolution. Good for quick previews.</li>
                                    <li><strong>150 DPI</strong>: Good for general web use and ebooks.</li>
                                    <li><strong>300 DPI</strong>: Print quality. Necessary if you plan to print the resulting images.</li>
                                </ul>
                                <p>
                                    Our converter manages this balance automatically to ensure your text stays sharp without generating massive file sizes.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is it safe for confidential reports?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Yes. Converting a 50-page confidential report? Do not upload it to a cloud converter.
                                    Our tool processes the rendering using your own computer's CPU. The conversion happens <strong>offline</strong> in your browser tab.
                                </p>
                            </div>
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
