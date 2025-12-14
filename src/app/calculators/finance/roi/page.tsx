import { Metadata } from 'next';
import ROICalculatorClient from '@/components/calculators/ROICalculatorClient';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'ROI Calculator - Calculate Investment Return & Annualized Growth',
    description: 'Free Return on Investment (ROI) calculator. Calculate total profit, annualized return, and investment growth instantly.',
    keywords: ['roi calculator', 'return on investment', 'investment calculator', 'annualized return formula', 'profit calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/roi',
    },
    openGraph: {
        title: 'ROI Calculator | UnitMaster',
        description: 'Calculate your investment returns and profit.',
        url: 'https://unitmaster.io/calculators/finance/roi',
        type: 'website',
    },
};

export default function ROIPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">ROI Calculator</h1>
                <p className="text-muted-foreground">Calculate Return on Investment and Annualized Returns.</p>
            </div>

            <ROICalculatorClient />

            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-neutral dark:prose-invert">
                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How to Calculate ROI</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    <strong>Return on Investment (ROI)</strong> is a performance measure used to evaluate the efficiency of an investment.
                                    It measures the amount of return on a particular investment, relative to the investment's cost.
                                </p>
                                <p>
                                    The simple formula is:
                                    <br />
                                    <code>ROI = (Net Profit / Cost of Investment) x 100</code>
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is Annualized ROI (CAGR)?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Simple ROI doesn't account for time. A 20% return over 1 year is great. A 20% return over 10 years is terrible.
                                    <strong>Annualized ROI</strong> tells you the yearly growth rate (CAGR), allowing you to compare investments of different lengths.
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
                                name: 'How do you calculate ROI?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'ROI is calculated by dividing the Net Profit by the Cost of Investment, then multiplying by 100. Formula: (Net Profit / Cost) * 100.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What is Annualized ROI?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Annualized ROI, or CAGR, determines the annual growth rate of an investment, accounting for the time period held. It is better for comparing long-term investments than simple ROI.'
                                }
                            }
                        ]
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FinancialProduct',
                        name: 'ROI Calculator',
                        description: 'A tool to calculate investment return.',
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

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Finance', path: '#' },
                    { name: 'ROI Calculator', path: '/calculators/finance/roi' }
                ]}
            />
        </div>
    );
}
