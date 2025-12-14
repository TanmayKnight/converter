import type { Metadata } from 'next';
import PercentageCalculatorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Percentage Calculator - Calculate % Increase, Decrease & Difference',
    description: 'Free Percentage Calculator. Find percentage difference, increase/decrease, or what percentage one number is of another instantly.',
    keywords: ['percentage calculator', 'percent difference', 'percentage increase calculator', 'how to calculate percentage', 'percent change formula'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/percentage',
    },
};

export default function PercentagePage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Percentage Calculator</h1>
                <p className="text-muted-foreground">Calculate percentages, increases, and decreases easily.</p>
            </div>

            <PercentageCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>The Ultimate Guide to Percentages in Real Life</h2>
                <p>
                    Percentages are everywhere. From the &quot;30% OFF&quot; sale at the mall to the 20% tip at dinner, understanding how to calculate them quickly is a superpower.
                    <strong>UnitMaster</strong> makes the complex math simple, but learning the tricks can help you do it in your head.
                </p>

                <h3>Mental Math Tricks</h3>
                <p>
                    Want to impress your friends? Here is how to calculate percentages instantly without a calculator:
                </p>
                <ul>
                    <li><strong>The 10% Rule</strong>: To find 10% of any number, just move the decimal point one spot to the left. (10% of $50.00 is $5.00).</li>
                    <li><strong>The 20% Tip</strong>: Find 10% and verify double it. (Meal is $40 &rarr; 10% is $4 &rarr; Tip is $8).</li>
                    <li><strong>The Swap Trick</strong>: <br /><strong>x% of y</strong> is exactly the same as <strong>y% of x</strong>.<br />
                        <em>Example:</em> You need to find 8% of 25. That sounds hard.<br />
                        <em>Swap it:</em> Find 25% of 8. That&apos;s easy (it&apos;s one-quarter). The answer is 2.
                    </li>
                </ul>

                <h3>Visualizing Percentage Change</h3>
                <p>
                    One of the most common confusion points is the difference between &quot;Percentage Of&quot; and &quot;Percentage Change&quot;.
                </p>
                <ul>
                    <li><strong>Percentage Of</strong> tells you a portion. (50 is 50% of 100).</li>
                    <li><strong>Percentage Change</strong> tells you growth or shrinkage. If a stock goes from $100 to $150, that is a 50% increase. If it drops back to $100, that is a 33.3% decrease. The math is not symmetrical!</li>
                </ul>

                <h3>The Formula</h3>
                <p>
                    For those who like algebra, the universal formula for percentage increase/decrease is:
                </p>
                <div className="not-prose bg-secondary/20 p-4 rounded-lg font-mono text-center my-4">
                    (New Value - Old Value) / Old Value × 100
                </div>
                <p>
                    If the result is positive, it&apos;s an increase. If negative, it&apos;s a decrease.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do I calculate a discount?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    To calculate a 20% discount on a $50 item:
                                    <br />
                                    1. Convert percentage to decimal (20% = 0.20).
                                    <br />
                                    2. Multiply price by decimal ($50 * 0.20 = $10 discount).
                                    <br />
                                    3. Subtract discount from original price ($50 - $10 = $40 final price).
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the reverse percentage formula?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    To calculate a price BEFORE tax (e.g., you paid $110 including 10% tax):
                                    <br />
                                    <code>Original = Final / (1 + Tax_Rate)</code>
                                    <br />
                                    $110 / 1.10 = $100.
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
                                name: 'How do I calculate percentage increase?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Subtract the original value from the new value, divide the result by the original value, and multiply by 100. Formula: ((New - Old) / Old) * 100.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is 20% of a number?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'To find 20%, you can divide the number by 5. Alternatively, find 10% by moving the decimal one place to the left, then double it.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do you reverse calculate a percentage?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'To find the original value before a percentage increase (like tax), divide the final amount by (1 + percentage as decimal). For example, Value / 1.20 for a 20% tax.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
