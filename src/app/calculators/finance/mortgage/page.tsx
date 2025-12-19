import { Metadata } from 'next';
import { MortgageCalculatorClient } from '@/components/calculators/MortgageCalculatorClient';

import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    // ... existing metadata ...
    // Note: I will keep the existing metadata block intact in the real file, I'm just showing context here
    title: 'Mortgage Calculator with Real-Time Rates & PDF Reports',
    description: 'Calculate monthly payments with live mortgage rates. Features: Extra payments impact, Amortization PDF export, and Loan Comparison tool.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/mortgage',
    },
    openGraph: {
        title: 'Mortgage Calculator (Real-Time) | UnitMaster',
        description: 'Plan smarter with live rates, extra payment analysis, and PDF reports.',
        url: 'https://unitmaster.io/calculators/finance/mortgage',
        type: 'website',
    },
};

import { MarketRates } from '@/components/calculators/finance/MarketRates';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function MortgagePage() {
    return (
        <>
            <div className="container mx-auto px-4 max-w-4xl pt-8">
                <MarketRates />
            </div>
            <MortgageCalculatorClient />



            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h2>Smart Mortgage Planning: Real-Time Rates & Analysis</h2>
                <p>
                    Don't just calculate your payment; optimize it. The <strong>UnitMaster Mortgage Calculator</strong> connects to live market data to give you accurate estimates.
                    Use our <strong>Comparison Mode</strong> to shop lenders, or generate a <strong>PDF Amortization Schedule</strong> to see how extra payments save you thousands.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>The Truth About Amortization</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Most people are shocked when they see their capitalization table (Amortization Schedule).
                                    In the first few years of a 30-year mortgage, the vast majority of your payment goes towards <strong>Interest</strong>, not Principal.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Years 1-10</strong>: You are mostly paying rent to the bank. Your loan balance hardly moves.</li>
                                    <li><strong>Years 10-20</strong>: The scale starts to tip. You contribute more to equity.</li>
                                    <li><strong>Years 20-30</strong>: You are finally paying off the house itself.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>The "One Extra Payment" Hack</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Because interest is calculated on your remaining balance, prepaying even a small amount has a massive compounding effect.
                                    Making just <strong>one extra mortgage payment per year</strong> (applied directly to principal) can:
                                </p>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>Shorten a 30-year loan by roughly <strong>4 to 5 years</strong>.</li>
                                    <li>Save you tens of thousands of dollars in interest payments.</li>
                                </ol>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Fixed-Rate vs. ARM</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    <strong>Fixed-Rate Mortgages</strong> lock in your interest rate for the life of the loan. This provides stability—your principal and interest payment will never change, regardless of inflation or economic turmoil.
                                </p>
                                <p>
                                    <strong>Adjustable-Rate Mortgages (ARM)</strong> offer a lower introductory rate (e.g., for 5 or 7 years), but then the rate floats with the market.
                                    These are risky but can be smart if you plan to move or refinance before the fixed period ends.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>What is PMI?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Private Mortgage Insurance (PMI) is an extra fee you pay if your down payment is less than 20% of the home's value.
                                    It protects the lender, not you. Once you build 20% equity in your home, you should contact your lender immediately to have PMI removed.
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Finance', path: '#' },
                    { name: 'Mortgage Calculator', path: '/calculators/finance/mortgage' }
                ]}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FinancialProduct',
                        name: 'Mortgage Calculator',
                        description: 'A tool to calculate monthly mortgage payments.',
                        brand: {
                            '@type': 'Brand',
                            name: 'UnitMaster'
                        },
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD'
                        }
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'How does an extra mortgage payment help?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Making just one extra mortgage payment per year towards your principal can shorten a 30-year loan term by roughly 4-5 years and save tens of thousands of dollars in interest.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is the difference between Fixed-Rate and ARM mortgages?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'A Fixed-Rate Mortgage locks in your interest rate for the life of the loan, offering stability. An Adjustable-Rate Mortgage (ARM) starts with a lower rate for a set period (e.g., 5 years) but fluctuates with the market afterwards.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is PMI?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Private Mortgage Insurance (PMI) is an extra fee charged if your down payment is less than 20%. It protects the lender, not the borrower. You can remove it once you build 20% equity.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
