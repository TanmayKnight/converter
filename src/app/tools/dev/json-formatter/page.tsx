import type { Metadata } from 'next';
import JsonFormatterClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'JSON Formatter & Validator - Beautify JSON Online | UnitMaster',
    description: 'Free online JSON Formatter. Beautify, minify, and validate JSON code. Privacy-focused tool running securely in your browser.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'format json online', 'json minify'],
    alternates: {
        canonical: '/tools/dev/json-formatter',
    },
    openGraph: {
        title: 'JSON Formatter & Validator - Beautify JSON Online',
        description: 'Free online JSON Formatter. Beautify, minify, and validate JSON code securely in your browser.',
        type: 'website',
        url: '/tools/dev/json-formatter',
    },
};

export default function JsonFormatterPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'JSON Formatter',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Free online JSON formatter and validator. Beautify and minify JSON data locally.',
        featureList: 'JSON Formatting, JSON Minification, Syntax Validation',
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4 max-w-7xl pt-8 pb-4">
                <div className="text-center space-y-4 mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        JSON Formatter & Validator
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Beautify, minify, and validate your JSON data. Processed locally in your browser for privacy.
                    </p>
                </div>

                <JsonFormatterClient />
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl prose prose-neutral dark:prose-invert">
                <h2>JSON Best Practices & Debugging Guide</h2>
                <p>
                    <strong>JSON (JavaScript Object Notation)</strong> has eaten the world. It is the de-facto standard for data exchange on the web, replacing the verbose XML of the past.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Common JSON Errors (And How to Fix Them)</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>If our validator is screaming at you, check these usual suspects:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Trailing Commas</strong>: In JavaScript, leaving a comma after the last item in an array is fine. In JSON, it is a <strong>syntax error</strong>.</li>
                                    <li><strong>Single Quotes</strong>: JSON requires double quotes <code>"</code> for all strings and key names. Single quotes are strictly forbidden.</li>
                                    <li><strong>Comments</strong>: JSON does not support comments. If you need comments, use JSON5 or YAML.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Pretty Print vs. Minify</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    <strong>Pretty Printing</strong> (Beautifying) adds indentation and newlines to make the code human-readable. It is essential for debugging.
                                </p>
                                <p>
                                    <strong>Minification</strong> removes all whitespace. This is crucial for production. Minifying a large JSON payload can reduce its size by 30-40%.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is my JSON data safe?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Never paste production keys or passwords into online formatters that send data to a server.
                                </p>
                                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary my-2">
                                    <p className="text-sm font-medium text-foreground">
                                        🔒 Local Processing: UnitMaster is different. We process your JSON locally in your browser. Your sensitive data loop never leaves your machine.
                                    </p>
                                </div>
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
                                name: 'Why is my JSON invalid?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Common reasons include using single quotes (JSON requires double quotes), trailing commas (not allowed in JSON), or unquoted keys.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is the difference between prettify and minify?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Prettify adds whitespace and indentation for human readability. Minify removes all extra characters to reduce file size for efficient transmission.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is this JSON formatter secure?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. UnitMaster JSON Formatter runs entirely in your browser using JavaScript. No data is sent to the server, ensuring privacy.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
