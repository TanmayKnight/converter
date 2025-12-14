'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PDFSigner = dynamic(() => import('@/components/pdf/PDFSigner'), {
    loading: () => (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading PDF Tools...</p>
        </div>
    ),
    ssr: false
});

export default function SignPDFPage() {
    return (
        <div className="space-y-8">
            <PDFSigner />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Electronic Signatures: Fast, Legal, and Free</h2>
                <p>
                    In the remote work era, printing, signing, and scanning documents is obsolete.
                    <strong>UnitMaster PDF Sign</strong> allows you to sign documents legally and securely from your browser.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Are Electronic Signatures Legal?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Yes. In the United States (ESIGN Act of 2000) and the European Union (eIDAS), electronic signatures are legally binding for most business transactions, contracts, and agreements.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it safe for confidential contracts?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Most "free" tools upload your files to their servers. We do not.
                                </p>
                                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary my-2">
                                    <p className="text-sm font-medium text-foreground">
                                        🔒 Private by Design: UnitMaster loads the PDF engine into your browser's local memory.
                                        Your medical forms, NDAs, and contracts never leave your device.
                                    </p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Best Practices for e-Signing</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Draw Your Signature</strong>: While typing a signature is often legal, drawing it adds a layer of authenticity.</li>
                                    <li><strong>Date the Document</strong>: Always add a date field next to your signature to establish the timeline of execution.</li>
                                    <li><strong>Lock the File</strong>: After signing, it is good practice to "Flatten" or "Print to PDF" to prevent further modification.</li>
                                </ul>
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
                                name: 'Are online electronic signatures legal?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, electronic signatures are legally binding in the US (ESIGN Act), EU (eIDAS), and most other jurisdictions for standard contracts and agreements.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: ' Is UnitMaster PDF Sign safe for legal documents?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. Our signing tool works 100% offline in your browser. Your confidential contracts and legal forms are never uploaded to any server.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Can I draw my signature?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, you can draw your signature with a mouse or touch screen, or use a text-based signature, both of which are legally valid methods.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </div>
    );
}
