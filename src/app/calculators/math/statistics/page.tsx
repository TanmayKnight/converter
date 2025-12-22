import type { Metadata } from 'next';
import StatsCalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Statistics Calculator - Permutations, Combinations & Probability',
    description: 'Solve statistics problems online. Calculate Mean, Permutations (nPr), Combinations (nCr), and Probability instantly. Works offline.',
    keywords: ['statistics calculator offline', 'permutation calculator', 'combination calculator', 'npr calculator', 'probability calculator local', 'ncr calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/statistics',
    },
};

export default function StatisticsPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Statistics Calculator</h1>
                <p className="text-muted-foreground">Permutations, Combinations, Factorials & More.</p>
            </div>

            <StatsCalculatorClient />

            <SeoContentSection
                title="Statistics Concepts Explained"
                description="Solve common probability and combinatorics problems without confusion. Understand the difference between Permutations and Combinations instantly."
                features={[
                    {
                        title: "Permutations (nPr)",
                        description: "Calculates the number of ways to arrange items where order matters (e.g., a lock code)."
                    },
                    {
                        title: "Combinations (nCr)",
                        description: "Calculates the number of ways to choose items where order does not matter (e.g., lottery numbers)."
                    },
                    {
                        title: "Factorials (!)",
                        description: "Compute factorials used in advanced probability. 5! = 5 × 4 × 3 × 2 × 1 = 120."
                    }
                ]}
                benefits={[
                    "Verify probability homework.",
                    "Calculate lottery odds.",
                    "Understand data grouping.",
                    "Offline & Private."
                ]}
                faqs={[
                    {
                        question: "What does n and r stand for?",
                        answer: "n = Total number of items in the set. r = Number of items you are choosing/selecting to arrange."
                    },
                    {
                        question: "What is the probability of winning the lottery?",
                        answer: "This is a Combination problem. If you choose 6 numbers out of 49, it is 49 C 6 = 13,983,816. The probability is 1 in 13.9 million."
                    },
                    {
                        question: "What is 0 factorial (0!)?",
                        answer: "0! is defined as 1. This mathematical convention makes probability formulas work correctly."
                    },
                    {
                        question: "What is the difference between Permutation and Combination?",
                        answer: "In Permutations, the order matters (code 123 is different from 321). In Combinations, order doesn't matter (a fruit salad of Apple+Banana is the same as Banana+Apple)."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Statistics Calculator",
                    "applicationCategory": "EducationalApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Permutations, Combinations, Factorials, Probability, Offline Calculation"
                }}
            />

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Math Calculators', path: '/calculators/math' },
                    { name: 'Statistics Calculator', path: '/calculators/math/statistics' }
                ]}
            />
        </div>
    );
}
