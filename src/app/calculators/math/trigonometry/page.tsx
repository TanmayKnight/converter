import type { Metadata } from 'next';
import TrigCalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Trigonometry Calculator - Sin, Cos, Tan Offline',
    description: 'Calculate Sine, Cosine, Tangent and their Inverse functions (Arcsin, Arccos, Arctan) instantly. Supports degrees. Works offline.',
    keywords: ['trigonometry calculator offline', 'sin calculator', 'cos calculator', 'tan calculator', 'inverse sine', 'trig functions', 'soh cah toa'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/trigonometry',
    },
};

export default function TrigPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Trigonometry Calculator</h1>
                <p className="text-muted-foreground">Calculate Sine, Cosine, Tangent and their inverses.</p>
            </div>

            <TrigCalculatorClient />

            <SeoContentSection
                title="The Triangle Math (Trigonometry)"
                description="Trigonometry studies relationships between side lengths and angles of triangles. It is fundamental to engineering, physics, and video game development."
                features={[
                    {
                        title: "SOH CAH TOA",
                        description: "Sine = Opposite/Hypotenuse. Cosine = Adjacent/Hypotenuse. Tangent = Opposite/Adjacent."
                    },
                    {
                        title: "Inverse Functions",
                        description: "Find the Angle from the sides ratio using Arcsin, Arccos, and Arctan."
                    },
                    {
                        title: "Degree Support",
                        description: "This calculator assumes inputs are in Degrees (e.g., 90°), covering the most common use cases."
                    }
                ]}
                benefits={[
                    "Solve homework problems.",
                    "Calculate building heights.",
                    "Work on game physics.",
                    "No internet required."
                ]}
                faqs={[
                    {
                        question: "Does this calculator use Degrees or Radians?",
                        answer: "This calculator assumes inputs are in Degrees. To convert to Radians: Multiply by Pi/180."
                    },
                    {
                        question: "Why is Tan(90°) undefined?",
                        answer: "Tan = Sin/Cos. At 90 degrees, Cos is 0. Dividing by zero is undefined (approaches infinity)."
                    },
                    {
                        question: "What is the inverse of Sin?",
                        answer: "The inverse is Arcsin (sin⁻¹), which gives you the angle when provided with the ratio."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Trigonometry Calculator",
                    "applicationCategory": "EducationalApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Sine, Cosine, Tangent, Inverse Trig, Degree Mode"
                }}
            />
        </div>
    );
}
