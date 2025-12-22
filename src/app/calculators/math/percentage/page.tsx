import type { Metadata } from 'next';
import PercentageCalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Percentage Calculator - Calculate % Increase & Difference Offline',
    description: 'Free Percentage Calculator. Find percentage difference, increase/decrease, or what percentage one number is of another. Works offline instantly.',
    keywords: ['percentage calculator offline', 'percent difference local', 'percentage increase calculator', 'percent change no upload', 'math calculator privacy'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/percentage',
    },
};

export default function PercentagePage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Percentage Calculator</h1>
                <p className="text-muted-foreground">Calculate percentages, increases, and decreases easily.</p>
            </div>

            <PercentageCalculatorClient />

            <SeoContentSection
                title="The Ultimate Guide to Percentages (Offline)"
                description="Percentages are everywhere. From the '30% OFF' sale to the 20% tip at dinner, understanding how to calculate them is a superpower. UnitMaster makes it simple and private."
                features={[
                    {
                        title: "100% Private Math",
                        description: "All calculations happen in your browser. No data is sent to a server, making it faster and more secure than cloud calculators."
                    },
                    {
                        title: "Instant Results",
                        description: "Calculate percentage increase, decrease, or difference instantly as you type."
                    },
                    {
                        title: "Visual Explanations",
                        description: "Understand the formula behind the numbers. We show you the math so you can learn."
                    }
                ]}
                benefits={[
                    "Calculate discounts instantly.",
                    "Figure out tax rates.",
                    "Determine stock growth.",
                    "Split bills and tips."
                ]}
                faqs={[
                    {
                        question: "How do I calculate a discount?",
                        answer: "To calculate a 20% discount on a $50 item: 1. Convert percentage to decimal (0.20). 2. Multiply price by decimal ($10). 3. Subtract from original ($40). Our tool does this automatically."
                    },
                    {
                        question: "What is the reverse percentage formula?",
                        answer: "To calculate a price BEFORE tax (e.g., you paid $110 including 10% tax): Original = Final / (1 + Tax_Rate). Example: $110 / 1.10 = $100."
                    },
                    {
                        question: "How do I calculate percentage increase?",
                        answer: "Subtract the original value from the new value, divide the result by the original value, and multiply by 100. Formula: ((New - Old) / Old) * 100."
                    },
                    {
                        question: "What is 20% of a number?",
                        answer: "To find 20%, you can divide the number by 5. Alternatively, find 10% by moving the decimal one place to the left, then double it."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Percentage Calculator",
                    "applicationCategory": "EducationalApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Percentage Increase, Percentage Decrease, Reverse Percentage, Offline Calculation"
                }}
            />
        </div>
    );
}
