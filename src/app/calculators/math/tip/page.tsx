import type { Metadata } from 'next';
import TipCalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Tip Calculator - Split Bill & Calculate Gratuity Offline',
    description: 'Free tip calculator and bill splitter. Calculate gratuity and split the bill evenly among friends instantly. Works offline.',
    keywords: ['tip calculator', 'bill splitter', 'gratuity calculator', 'tip calculator offline', 'split bill app'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/tip',
    },
};

export default function TipPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Tip Splitter</h1>
                <p className="text-muted-foreground">Calculate tip and split the bill.</p>
            </div>

            <TipCalculatorClient />

            <SeoContentSection
                title="Tipping Etiquette: A Global Guide"
                description="Tipping (Gratuity) norms vary wildly across the world. While 20% is standard in New York, it might be considered rude in Tokyo. Our Calculator helps you do the math instantly."
                features={[
                    {
                        title: "Bill Splitting",
                        description: "Split the check evenly among friends. No more awkward math after dinner."
                    },
                    {
                        title: "Global Standards",
                        description: "USA/Canada: 15-25%. Europe: 10%. Asia: 0%. Australia: Optional."
                    },
                    {
                        title: "Rounding Options",
                        description: "Round the total per person to avoid dealing with loose change."
                    }
                ]}
                benefits={[
                    "Split bills fairly.",
                    "Avoid rude tipping.",
                    "Calculate per-person cost.",
                    "Works offline."
                ]}
                faqs={[
                    {
                        question: "Should I tip Pre-Tax or Post-Tax?",
                        answer: "Etiquette experts argue you should tip on the Pre-Tax amount. However, most machines calculate on the Grand Total (Post-Tax) for convenience."
                    },
                    {
                        question: "What does 'Service Included' mean?",
                        answer: "If your bill says 'Service Charge Included' (common in Europe or for large groups), you do NOT need to add an extra tip unless service was exceptional."
                    },
                    {
                        question: "How much should I tip in the US?",
                        answer: "In the USA, 15-20% is standard. Waiters often rely on tips for their wage."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Tip Calculator",
                    "applicationCategory": "FinanceApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Tip Calculation, Bill Splitter, Gratuity Guide"
                }}
            />
        </div>
    );
}
