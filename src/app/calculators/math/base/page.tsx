import type { Metadata } from 'next';
import BaseConverterClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Base Converter - Binary, Octal, Decimal, Hex | UnitMaster',
    description: 'Convert numbers between any base System (Binary, Octal, Decimal, Hexadecimal) instantly online. Support for custom bases up to 36.',
    keywords: ['base converter', 'binary converter', 'hex converter', 'decimal to binary', 'octal converter', 'radix converter'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/base',
    },
};

export default function BasePage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Number System Converter</h1>
                <p className="text-muted-foreground">Convert numbers between Binary, Decimal, Octal, and Hexadecimal.</p>
            </div>

            <BaseConverterClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Understanding Number Systems</h2>
                <p>
                    A <strong>Radix</strong> (or Base) determines how many unique digits use to represent numbers.
                    We use Base-10 (Decimal) in everyday life, but computers rely on other bases.
                </p>

                <h3>Common Bases</h3>
                <ul>
                    <li><strong>Binary (Base-2)</strong>: Uses 0 and 1. The native language of computers (on/off switches).</li>
                    <li><strong>Octal (Base-8)</strong>: Uses 0-7. Used in Unix file permissions (e.g., chmod 777).</li>
                    <li><strong>Decimal (Base-10)</strong>: Uses 0-9. The standard human counting system.</li>
                    <li><strong>Hexadecimal (Base-16)</strong>: Uses 0-9 and A-F. Used for colors (e.g., #FFFFFF) and memory addresses.</li>
                </ul>

                <h3>How to Convert Manually?</h3>
                <p>
                    <strong>Decimal to Binary:</strong> Divide the number by 2 repeatedly and record the remainders. Read the remainders from bottom to top.
                    <br />
                    <em>Example (13):</em>
                    <br />
                    13 / 2 = 6 rem <strong>1</strong><br />
                    6 / 2 = 3 rem <strong>0</strong><br />
                    3 / 2 = 1 rem <strong>1</strong><br />
                    1 / 2 = 0 rem <strong>1</strong><br />
                    Result: <strong>1101</strong>
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the maximum base supported?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Our calculator supports bases up to 36.
                                    This uses digits 0-9 combined with all letters of the alphabet (A-Z), where A=10 and Z=35.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why is Hexadecimal (Hex) so popular?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Hex is a &quot;short-hand&quot; for binary. One Hex digit represents exactly 4 binary bits (a nibble).
                                    <br />
                                    <code>1111</code> in Binary is <code>F</code> in Hex.
                                    It is much easier to read <code>#FF</code> than <code>11111111</code>.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>How do I denote a base?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    In math, we use a subscript: 101<sub>2</sub> (Binary) = 5<sub>10</sub> (Decimal).
                                    In programming, we use prefixes:
                                    <ul className="list-disc pl-6 mt-2">
                                        <li><code>0b</code> for Binary (0b101)</li>
                                        <li><code>0x</code> for Hex (0xFF)</li>
                                        <li><code>0o</code> for Octal (0o77)</li>
                                    </ul>
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
                                name: 'What is Binary?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Binary is a base-2 number system that uses only two digits: 0 and 1. It is the fundamental language of computers.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do I read Hexadecimal?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Hexadecimal (Base-16) uses numbers 0-9 and letters A-F. A=10, B=11, C=12, D=13, E=14, F=15. It is commonly used for color codes and memory.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do I convert Decimal to Binary?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'To convert Decimal to Binary, divide the number by 2 repeatedly and keep track of the remainders. The sequence of remainders (read in reverse) is the binary representation.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
