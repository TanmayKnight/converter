import type { Metadata } from 'next';
import WordsConverterClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Numbers to Words Converter - Check Writing Helper | UnitMaster',
    description: 'Convert numerical digits to written words instantly (e.g. 100 -> One Hundred). Useful for check writing and legal documents.',
    keywords: ['numbers to words', 'check writer', 'number converter', 'write number as text', 'digits to text'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/words',
    },
};

export default function WordsPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Number to Words</h1>
                <p className="text-muted-foreground">Convert numerical digits into written words.</p>
            </div>

            <WordsConverterClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Why Write Numbers as Words?</h2>
                <p>
                    Writing numbers as words is often required in formal situations to prevent fraud or confusion.
                    Digits (1, 2, 3) are easy to alter. An extra zero can change $100 to $1000.
                    Words (&quot;One Hundred&quot;) are much harder to forge.
                </p>

                <h3>Common Use Cases</h3>
                <ul>
                    <li><strong>Bank Checks</strong>: Just below the &quot;Pay to the Order of&quot; line, you must write the amount in words.</li>
                    <li><strong>Legal Contracts</strong>: To ensure there is no ambiguity about dates or dollar amounts.</li>
                    <li><strong>Formal Invitations</strong>: &quot;The Fourth of July&quot; looks more elegant than &quot;July 4&quot;.</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do you write cents on a check?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Cents are usually written as a fraction over 100.
                                    <br />
                                    <em>Example:</em> $150.25 is written as &quot;One Hundred Fifty and 25/100&quot;.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Should I use &quot;And&quot;?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    In formal British English, you might say &quot;One Hundred <strong>and</strong> Fifty&quot;.
                                    In American Math, &quot;And&quot; technically denotes a decimal point. So 150 should be &quot;One Hundred Fifty&quot;, not &quot;One Hundred and Fifty&quot;.
                                    However, in casual use, both are accepted.
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
                                name: 'How do you write 1000 in words?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'One Thousand.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Why do we write out numbers on checks?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Writing out the number in words prevents fraud. It is much harder to alter written text (e.g., changing &quot;One&quot; to &quot;One Thousand&quot;) than it is to add zeros to digits.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
