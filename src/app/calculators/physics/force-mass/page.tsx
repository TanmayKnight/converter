import type { Metadata } from 'next';
import MassForceCalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Force Converter - Mass to Force Calculator (kg to kN)',
    description: 'Convert Mass (kg) to Force (kN) instantly. Uses standard gravity 9.80665 m/s². Simple and accurate physics calculator. Works offline.',
    keywords: ['force calculator', 'mass to force', 'kg to newton', 'kg to kn', 'physics calculator', 'weight calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/physics/force-mass',
    },
};

export default function MassForcePage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Mass ↔ Force Converter</h1>
                <p className="text-muted-foreground">Convert Mass (Kilograms) to Force (Kilonewtons) using standard Earth gravity.</p>
            </div>

            <MassForceCalculatorClient />

            <SeoContentSection
                title="Mass vs. Weight: Investigating Newton's Second Law"
                description="In everyday language, we use 'weight' to mean mass, but in physics, they are different. Mass (kg) is the amount of matter in an object. Weight/Force (N) is the force of gravity acting on that mass."
                features={[
                    {
                        title: "Newton's Second Law",
                        description: "F = m × a. Calculates force based on mass and acceleration (gravity)."
                    },
                    {
                        title: "Standard Gravity",
                        description: "Uses the standard Earth gravity constant (g ≈ 9.80665 m/s²) for accurate conversion."
                    },
                    {
                        title: "Engineering Units",
                        description: "Quickly convert between Kilograms (Mass) and Kilonewtons (Force) for structural calculations."
                    }
                ]}
                benefits={[
                    "Physics homework help.",
                    "Structural engineering.",
                    "Load calculations.",
                    "100% Client-side."
                ]}
                faqs={[
                    {
                        question: "What is a Newton (N)?",
                        answer: "A Newton is the SI unit of force. One Newton is the force needed to accelerate 1 kilogram of mass at the rate of 1 meter per second squared."
                    },
                    {
                        question: "What is a Kilonewton (kN)?",
                        answer: "A Kilonewton is equal to 1,000 Newtons. It is often used in engineering and construction to measure heavy loads. 1 kN ≈ 102 kg of mass on Earth."
                    },
                    {
                        question: "How do you convert kg to Newtons?",
                        answer: "Multiply the mass in kg by 9.81 (or precise 9.80665). For example, 10 kg × 9.81 = 98.1 N."
                    },
                    {
                        question: "Is mass the same as weight?",
                        answer: "No. Mass is the quantity of matter (constant). Weight is the force of gravity on that matter (varies by location). If you go to the Moon, your mass stays the same, but your weight drops."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Force Converter",
                    "applicationCategory": "EducationalApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />
        </div>
    );
}
