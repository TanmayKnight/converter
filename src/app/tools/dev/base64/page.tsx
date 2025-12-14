import type { Metadata } from 'next';
import Base64Client from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Base64 Converter - Encode & Decode Online | UnitMaster',
    description: 'Free Base64 Encoder and Decoder. Convert text and files to Base64 format and back. Supports UTF-8 and client-side privacy.',
    keywords: ['base64 converter', 'base64 encode', 'base64 decode', 'utf8 base64', 'online converter'],
};

export default function Base64Page() {
    return (
        <div className="space-y-8">
            <Base64Client />

            <div className="container mx-auto px-4 py-12 max-w-5xl prose prose-neutral dark:prose-invert">
                <h2>Base64 Encoding Explained</h2>
                <p>
                    Base64 is a group of binary-to-text encoding schemes. It turns binary data (like an image or a PDF) into a string of ASCII characters.
                    <strong>UnitMaster Base64</strong> helps you translate between these formats instantly.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why do we need Base64?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    The internet was originally built to handle text, not binary files.
                                    Protocols like Email (SMTP) were designed for ASCII characters. If you try to send a raw image file through a text-only channel, it will get corrupted.
                                </p>
                                <p>
                                    <strong>Base64 makes binary data safe for transport</strong> by converting it into safe text characters (A-Z, a-z, 0-9, +, /).
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Does Base64 increase file size?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Yes. Base64 encoding increases the file size by approximately <strong>33%</strong>.
                                    For example, a 10MB image will become a ~13.3MB Base64 string. Use it wisely!
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Common Use Cases</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Data URIs</strong>: Embedding small icons directly into HTML/CSS to avoid an extra HTTP request (<code>src="data:image/png;base64..."</code>).</li>
                                    <li><strong>Email Attachments</strong>: MIME uses Base64 to attach files to emails.</li>
                                    <li><strong>Basic Auth</strong>: HTTP Basic Authentication encodes <code>username:password</code> in Base64 (Note: This is NOT encryption!).</li>
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
                                name: 'What is Base64 encoding used for?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Base64 is used to encode binary data (like images or files) into ASCII text format so it can be safely transmitted over protocols that only support text, such as Email or HTML.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is Base64 the same as encryption?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No. Base64 is an encoding scheme, not encryption. It is easily reversible and provides no security for sensitive data.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How much larger does Base64 make a file?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Base64 encoding typically increases the size of the data by about 33% compared to the original binary file.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </div>
    );
}
