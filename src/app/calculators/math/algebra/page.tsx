import type { Metadata } from 'next';
import AlgebraClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Algebra Calculator - Square Roots, Exponents & Logarithms Offline',
    description: 'Free online algebra calculator. Calculate square roots, exponents, logarithms (log, ln), and antilogarithms instantly. Works offline.',
    keywords: ['algebra calculator', 'square root calculator', 'exponent calculator', 'logarithm calculator', 'ln calculator', 'math solver offline'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/algebra',
    },
};

export default function AlgebraPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Algebra Calculator</h1>
                <p className="text-muted-foreground">Roots, Exponents, and Logarithms made simple.</p>
            </div>

            <AlgebraClient />

            <SeoContentSection
                title="Algebra Concepts Explained (Offline)"
                description="Algebra is the branch of mathematics that substitutes letters for numbers to solve for unknown values. Our calculator focuses on Fundamental Operations that are the building blocks of complex equations."
                features={[
                    {
                        title: "Square Root (√)",
                        description: "The square root of a number x is a number y such that y² = x. Example: √25 = 5, because 5 * 5 = 25."
                    },
                    {
                        title: "Exponents (Power)",
                        description: "An exponent refers to the number of times a number is multiplied by itself. Formula: xⁿ (x raised to the power of n). Example: 2³ = 8."
                    },
                    {
                        title: "Logarithms",
                        description: "A logarithm is the inverse of an exponent. It answers the question: 'To what power must we raise the base to obtain a given number?'"
                    }
                ]}
                benefits={[
                    "Calculate complex roots.",
                    "Verify homework answers.",
                    "Understand growth (exponents).",
                    "Solve engineering probs (Log10/Ln)."
                ]}
                faqs={[
                    {
                        question: "What is the difference between Log and Ln?",
                        answer: "Log usually refers to the base-10 logarithm (log10), while Ln refers to the natural logarithm, which uses base e (approx 2.718). Essential for calculus."
                    },
                    {
                        question: "How do I calculate a negative exponent?",
                        answer: "A negative exponent means taking the reciprocal. x^-n = 1 / x^n. Example: 2^-2 = 1 / 4 = 0.25."
                    },
                    {
                        question: "Can I find the square root of a negative number?",
                        answer: "Not in the set of Real Numbers (which this calculator uses). The square root of a negative number is an Imaginary Number (i)."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Algebra Calculator",
                    "applicationCategory": "EducationalApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Square Root, Exponents, Logarithms, Natural Log, Offline Calculation"
                }}
            />
        </div>
    );
}
