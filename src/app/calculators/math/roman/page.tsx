import type { Metadata } from 'next';
import RomanConverterClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Roman Numeral Converter - Date & Number to Roman | UnitMaster',
    description: 'Convert numbers to Roman Numerals (2024 -> MMXXIV) or Roman Numerals to Numbers instantly. Learn the logic and verify dates easily.',
    keywords: ['roman numeral converter', 'roman numerals date', 'mmxxiv meaning', 'number to roman', 'roman to arabic'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/roman',
    },
};

export default function RomanPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Roman Numeral Converter</h1>
                <p className="text-muted-foreground">Auto-detects Number to Roman OR Roman to Number.</p>
            </div>

            <RomanConverterClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>The Logic of Rome</h2>
                <p>
                    Roman numerals originated in ancient Rome and remained the usual way of writing numbers throughout Europe well into the Late Middle Ages.
                    Today, we mostly use them for movie copyrights, Super Bowls, and fancy clock faces.
                </p>

                <h3>The 7 Symbols</h3>
                <div className="grid grid-cols-7 gap-2 text-center not-prose mb-6">
                    <div className="bg-card p-2 rounded border"><strong>I</strong><br />1</div>
                    <div className="bg-card p-2 rounded border"><strong>V</strong><br />5</div>
                    <div className="bg-card p-2 rounded border"><strong>X</strong><br />10</div>
                    <div className="bg-card p-2 rounded border"><strong>L</strong><br />50</div>
                    <div className="bg-card p-2 rounded border"><strong>C</strong><br />100</div>
                    <div className="bg-card p-2 rounded border"><strong>D</strong><br />500</div>
                    <div className="bg-card p-2 rounded border"><strong>M</strong><br />1000</div>
                </div>

                <h3>Subtractive Notation</h3>
                <p>
                    The tricky part is that a smaller number placed <em>before</em> a larger one is subtracted.
                </p>
                <ul>
                    <li><strong>IV</strong>: 5 - 1 = 4</li>
                    <li><strong>IX</strong>: 10 - 1 = 9</li>
                    <li><strong>XL</strong>: 50 - 10 = 40</li>
                    <li><strong>XC</strong>: 100 - 10 = 90</li>
                    <li><strong>CM</strong>: 1000 - 100 = 900</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is there a zero in Roman Numerals?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    <strong>No.</strong> The Romans had no symbol for Zero. They used the word <em>nulla</em> (none).
                                    The concept of Zero as a number was introduced to Europe later by Arabic mathematicians.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the largest number?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Standard Roman numerals go up to 3,999 (MMMCMXCIX).
                                    To write larger numbers, a line (vinculum) was placed over the symbol to multiply it by 1,000, but standard keyboards don&apos;t support this.
                                    Our calculator is optimized for the standard range.
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
                                name: 'How do you write 2024 in Roman Numerals?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '2024 is written as MMXXIV. (M = 1000, M = 1000, XX = 20, IV = 4).'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Why is 4 written as IV and not IIII?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'This is called subtractive notation. IV means &quot;one before five&quot;. It makes the numbers shorter and easier to read. However, on some clock faces, IIII is traditionally used for symmetry with VIII.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Do Roman Numerals have a zero?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'There is no zero symbol in Roman numerals. The concept of zero as a number wasn&apos;t used in Roman mathematics.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
