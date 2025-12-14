import type { Metadata } from 'next';
import QrCodeClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'QR Code Generator - Create Free QR Codes | UnitMaster',
    description: 'Free online QR Code Generator. Create custom QR codes for URLs, text, and Wi-Fi. High-quality PNG download.',
    keywords: ['qr code generator', 'create qr code', 'free qr code', 'qr code maker', 'custom qr code'],
};

export default function QrCodePage() {
    return (
        <>
            <QrCodeClient />

            <div className="container mx-auto px-4 max-w-4xl mt-16 prose prose-slate dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">Free Custom QR Code Generator</h2>
                <p className="lead text-lg text-muted-foreground mb-8">
                    Create permanent, high-quality QR codes for your business, Wi-Fi, or website. Customize colors, add logos, and download in print-ready formats.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How to create a free QR Code?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li><strong>Enter Data</strong>: Function (URL, Text, Wi-Fi, Email).</li>
                                    <li><strong>Customize</strong>: Choose your colors and corner styles.</li>
                                    <li><strong>Download</strong>: Get your QR code in PNG or SVG vector format.</li>
                                </ol>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Will these QR codes expire?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    <strong>No.</strong> These are static QR codes. The data is embedded directly into the image pattern. They will work forever and do not depend on our server to function.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can I check who scanned my QR code?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Since these are static codes (for privacy and permanence), we cannot track scans. If you need tracking, you should use a URL shortener service before generating the QR code.
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
                                name: 'How do I generate a QR code for free?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Enter your URL or text into the UnitMaster QR Code Generator, customize the design if you wish, and download the image. It is instant and free.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Do UnitMaster QR codes expire?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No. We generate static QR codes where the information is hard-coded into the pattern. They will never expire.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Can I generate a QR code for Wi-Fi?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. Select the "Wi-Fi" option, enter your network name (SSID) and password, and guests can scan it to connect instantly.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
