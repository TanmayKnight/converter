import type { Metadata } from 'next';
import OhmsLawCalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: "Ohm's Law Calculator - Voltage, Current, Resistance & Power",
    description: "Calculate Volts, Amps, Ohms, and Watts instantly. Easy to use Ohm's Law calculator for students, engineers, and hobbyists. Works offline.",
    keywords: ['ohms law calculator', 'voltage calculator', 'current calculator', 'resistance calculator', 'power calculator', 'watts calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/physics/ohms-law',
    },
};

export default function OhmsLawPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Ohm's Law Calculator</h1>
                <p className="text-muted-foreground">Calculate Voltage, Current, Resistance, and Power.</p>
            </div>

            <OhmsLawCalculatorClient />

            <SeoContentSection
                title="Ohm's Law: The Foundation of Electronics"
                description="If you want to understand how electricity works, you must understand Ohm's Law. Discovered by Georg Ohm in 1827, it describes the relationship between Voltage, Current, and Resistance."
                features={[
                    {
                        title: "The Water Pipe Analogy",
                        description: "Visualize electricity like water: Voltage is pressure, Current is flow rate, and Resistance is pipe size."
                    },
                    {
                        title: "Primary Formulas",
                        description: "V = I × R (Ohm's Law) and P = V × I (Power Law). All derived instantly."
                    },
                    {
                        title: "Safety First",
                        description: "Understand the relationship between current and heat to prevent short circuits."
                    }
                ]}
                benefits={[
                    "Circuit design helper.",
                    "Electrical engineering.",
                    "DIY electronics.",
                    "100% Client-side."
                ]}
                faqs={[
                    {
                        question: "Why do wires get hot?",
                        answer: "All wires have some Resistance. When Current flows through them, some energy is lost as heat (Power = I²R). If you push too much current through a thin wire (high resistance), it generates excessive heat."
                    },
                    {
                        question: "What is a Short Circuit?",
                        answer: "A short circuit happens when there is very low Resistance between two points of different voltage. According to Ohm's Law (I = V/R), if R is close to zero, Current becomes extremely high, causing sparks and blown fuses."
                    },
                    {
                        question: "What is the formula for Ohms Law?",
                        answer: "The fundamental formula is V = I × R, where V is Voltage (Volts), I is Current (Amperes), and R is Resistance (Ohms)."
                    },
                    {
                        question: "How do I calculate Watts from Volts and Amps?",
                        answer: "To calculate Power (Watts), multiply Voltage (Volts) by Current (Amps). The formula is P = V × I."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Ohm's Law Calculator",
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
