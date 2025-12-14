import type { Metadata } from 'next';
import TipCalculatorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Tip Calculator - Split Bill & Calculate Gratuity | UnitMaster',
    description: 'Free tip calculator and bill splitter. Calculate gratuity and split the bill evenly among friends instantly.',
    keywords: ['tip calculator', 'bill splitter', 'gratuity calculator', 'calculator for tips', 'restaurant tip calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/tip',
    },
};

export default function TipPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Tip Splitter</h1>
                <p className="text-muted-foreground">Calculate tip and split the bill.</p>
            </div>

            <TipCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Tipping Etiquette: A Global Guide</h2>
                <p>
                    Tipping (Gratuity) norms vary wildly across the world. While 20% is standard in New York, it might be considered rude in Tokyo.
                    <strong>UnitMaster Tip Calculator</strong> helps you do the math instantly, but knowing <em>when</em> to tip is up to you.
                </p>

                <h3>Tipping Cheat Sheet</h3>
                <ul>
                    <li><strong>USA & Canada</strong>: <strong>15-25%</strong>. Waiters earn below minimum wage and rely on tips. 15% is bare minimum, 20% is standard.</li>
                    <li><strong>Europe (UK, France, Germany)</strong>: <strong>10%</strong>. Service is usually included (&quot;Service Compris&quot;), but leaving a small extra amount is polite.</li>
                    <li><strong>Japan & South Korea</strong>: <strong>0%</strong>. Tipping is often seen as insulting (implying the employer doesn&apos;t pay enough). Superior service is expected as standard.</li>
                    <li><strong>Australia & NZ</strong>: <strong>0-10%</strong>. Optional. Only for exceptional service in fine dining.</li>
                </ul>

                <h3>Splitting the Bill</h3>
                <p>
                    The &quot;Per Person&quot; feature is arguably more useful than the tip calculation itself.
                    In large groups, mental math fails.
                    Our tool solves this instantly.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Should I tip Pre-Tax or Post-Tax?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Etiquette experts argue that you should tip on the <strong>Pre-Tax</strong> amount.
                                    Why should you tip the waiter for the tax charged by the government?
                                    However, most portable card machines (and our laziness) default to calculating on the Grand Total (Post-Tax).
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>What does &quot;Service Included&quot; mean?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    If your bill says &quot;Service Charge Included&quot; or &quot;Gratuity Included&quot; (common for parties of 6+), you do <strong>not</strong> need to add an extra tip unless the service was extraordinary.
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
                                name: 'How much should I tip in the US?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'In the United States, 15% to 20% is considered standard for table service. 15% for average service, 20% or more for good service.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Do I calculate tip on tax?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Strictly speaking, you should calculate the tip based on the pre-tax subtotal. However, many people tip on the total amount including tax for simplicity.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
