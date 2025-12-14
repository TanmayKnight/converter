import type { Metadata } from 'next';
import AlgebraClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Algebra Calculator - Square Roots, Exponents & Logarithms | UnitMaster',
    description: 'Free online algebra calculator. Calculate square roots, exponents (powers), logarithms (log, ln), and antilogarithms instantly.',
    keywords: ['algebra calculator', 'square root calculator', 'exponent calculator', 'logarithm calculator', 'ln calculator', 'power calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/algebra',
    },
};

export default function AlgebraPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Algebra Calculator</h1>
                <p className="text-muted-foreground">Roots, Exponents, and Logarithms made simple.</p>
            </div>

            <AlgebraClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Algebra Concepts Explained</h2>
                <p>
                    Algebra is the branch of mathematics that substitutes letters for numbers to solve for unknown values.
                    Our calculator focuses on <strong>Fundamental Operations</strong> that are the building blocks of complex equations.
                </p>

                <h3>1. Square Root (√)</h3>
                <p>
                    The square root of a number <em>x</em> is a number <em>y</em> such that <code>y² = x</code>.
                    <br />
                    <em>Example:</em> √25 = 5, because 5 * 5 = 25.
                </p>

                <h3>2. Exponents (Power)</h3>
                <p>
                    An exponent refers to the number of times a number is multiplied by itself.
                    <br />
                    <em>Formula:</em> <code>xⁿ</code> (x raised to the power of n).
                    <br />
                    <em>Example:</em> 2³ = 2 * 2 * 2 = 8.
                </p>

                <h3>3. Logarithms</h3>
                <p>
                    A logarithm is the inverse of an exponent. It answers the question: &quot;To what power must we raise the base to obtain a given number?&quot;
                </p>
                <ul>
                    <li><strong>Log10 (Common Log)</strong>: Base 10. Used in engineering (Decibels, Richter Scale).</li>
                    <li><strong>Log2 (Binary Log)</strong>: Base 2. fundamental in Computer Science and Information Theory.</li>
                    <li><strong>Ln (Natural Log)</strong>: Base <em>e</em> (2.718...). Critical in calculus and growth formulas (Compound Interest).</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the difference between Log and Ln?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    <strong>Log</strong> usually refers to the base-10 logarithm (log10), while <strong>Ln</strong> refers to the natural logarithm, which uses base <strong>e</strong> (Euler&apos;s number, approx 2.718).
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>How do I calculate a negative exponent?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    A negative exponent means taking the reciprocal.
                                    <br />
                                    <code>x⁻ⁿ = 1 / xⁿ</code>
                                    <br />
                                    <em>Example:</em> 2⁻² = 1 / 2² = 1 / 4 = <strong>0.25</strong>.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can I find the square root of a negative number?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Not in the set of Real Numbers. The square root of a negative number is an <strong>Imaginary Number</strong> (denoted by <em>i</em>).
                                    Our calculator currently works with Real Numbers only.
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
                                name: 'What is the difference between Log and Ln?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Log typically refers to Logarithm Base 10, while Ln stands for Natural Logarithm, which is Base e (approx 2.718).'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What does a negative exponent do?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'A negative exponent indicates the reciprocal of the base. For example, x^-n equals 1/x^n.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Why is the square root of a negative number error?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'In basic algebra, you cannot square a real number to get a negative result. The root of a negative number is an imaginary number.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
