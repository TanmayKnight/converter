import type { Metadata } from 'next';
import StatsCalculatorClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Statistics Calculator - Permutations, Combinations & Probability',
    description: 'Solve statistics problems online. Calculate Mean (Average), Permutations (nPr), Combinations (nCr), and Factorials instanty.',
    keywords: ['statistics calculator', 'permutation calculator', 'combination calculator', 'npr calculator', 'ncr calculator', 'probability calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/statistics',
    },
};

export default function StatisticsPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Statistics Calculator</h1>
                <p className="text-muted-foreground">Permutations, Combinations, Factorials & More.</p>
            </div>

            <StatsCalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                {/* Dynamic explanations moved to client component */}

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What does n and r stand for?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    <strong>n</strong> = Total number of items in the set.
                                    <br />
                                    <strong>r</strong> = Number of items you are choosing/selecting.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the probability of winning the lottery?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    This is a Combination problem. If you need to choose 6 numbers out of 49, it is <code>49 C 6</code>.
                                    That equals 13,983,816. The probability is <strong>1 in 13.9 million</strong>.
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
                                name: 'What is the difference between Permutation and Combination?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'In Permutations, the order of items matters (like a lock code). In Combinations, order does not matter (like ingredients in a salad).'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is 0 factorial (0!)?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: '0! is defined as 1. This convention makes many mathematical formulas work correctly.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
