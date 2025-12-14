import type { Metadata } from 'next';
import AsciiConverterClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'ASCII Converter - Text to Hex, Binary, Decimal | UnitMaster',
    description: 'Convert text to ASCII codes instantly. Translate strings to Hexadecimal, Binary (0s and 1s), and Decimal formats locally in your browser.',
    keywords: ['ascii converter', 'text to binary', 'text to hex', 'ascii table', 'character encoding', 'string to ascii'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/ascii',
    },
};

export default function AsciiPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">ASCII Text Converter</h1>
                <p className="text-muted-foreground">Convert text to Binary, Hexadecimal, and Decimal ASCII codes.</p>
            </div>

            <AsciiConverterClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>What is ASCII?</h2>
                <p>
                    <strong>ASCII</strong> (American Standard Code for Information Interchange) is a character encoding standard for electronic communication.
                    Computers don&apos;t understand letters like &apos;A&apos; or &apos;z&apos;. They only understand numbers (specifically, 0s and 1s).
                    ASCII assigns a unique number to every character.
                </p>

                <h3>Common ASCII Codes</h3>
                <div className="not-prose overflow-x-auto">
                    <table className="min-w-full text-sm text-left border rounded-lg">
                        <thead className="bg-secondary/50 font-bold">
                            <tr>
                                <th className="p-2 border">Char</th>
                                <th className="p-2 border">Decimal</th>
                                <th className="p-2 border">Hex</th>
                                <th className="p-2 border">Binary</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="p-2 border">&apos;A&apos;</td><td className="p-2 border">65</td><td className="p-2 border">41</td><td className="p-2 border">01000001</td></tr>
                            <tr><td className="p-2 border">&apos;B&apos;</td><td className="p-2 border">66</td><td className="p-2 border">42</td><td className="p-2 border">01000010</td></tr>
                            <tr><td className="p-2 border">&apos;a&apos;</td><td className="p-2 border">97</td><td className="p-2 border">61</td><td className="p-2 border">01100001</td></tr>
                            <tr><td className="p-2 border">&apos; &apos; (Space)</td><td className="p-2 border">32</td><td className="p-2 border">20</td><td className="p-2 border">00100000</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why are there separate uppercase and lowercase codes?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Computers treat &apos;A&apos; and &apos;a&apos; as completely different characters. In ASCII, &apos;A&apos; starts at 65, while &apos;a&apos; starts at 97.
                                    The difference between them is exactly 32 (or the 6th bit in binary), which allows for easy case conversion in software.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>How many characters does ASCII support?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Standard ASCII uses 7 bits, allowing for 128 characters (0-127).
                                    Extended ASCII uses 8 bits (1 byte), allowing for 256 characters (0-255). Modern systems use Unicode (UTF-8), which is backward compatible with ASCII but supports millions of characters (emojis, Chinese, etc.).
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
                                name: 'What does ASCII stand for?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'ASCII stands for American Standard Code for Information Interchange. It is the most common format for text files in computers and on the Internet.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do computers store text?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Computers store text as numbers. Under the hood, every letter is converted to a binary number (sequence of 0s and 1s) based on an encoding standard like ASCII.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
