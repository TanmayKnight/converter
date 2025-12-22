import type { Metadata } from 'next';
import BaseConverterClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Base Converter - Binary, Octal, Decimal, Hex Offline',
    description: 'Convert numbers between any base System (Binary, Octal, Decimal, Hexadecimal) instantly. Privacy-focused & Offline.',
    keywords: ['base converter offline', 'binary converter local', 'hex converter', 'decimal to binary', 'octal converter', 'radix converter'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/base',
    },
};

export default function BasePage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Number System Converter</h1>
                <p className="text-muted-foreground">Convert numbers between Binary, Decimal, Octal, and Hexadecimal.</p>
            </div>

            <BaseConverterClient />

            <SeoContentSection
                title="Understanding Number Systems (Offline)"
                description="A Radix (or Base) determines how many unique digits use to represent numbers. We use Base-10 (Decimal) in everyday life, but computers rely on Binary (2), Octal (8), and Hexadecimal (16)."
                features={[
                    {
                        title: "Any Base to Any Base",
                        description: "Convert from Binary to Hex, Decimal to Octal, or any custom base (up to 36)."
                    },
                    {
                        title: "100% Privacy",
                        description: "Computations run in your browser. Perfect for developers working with sensitive keys or memory addresses."
                    },
                    {
                        title: "Hexadecimal Support",
                        description: "Full support for Hex (Base-16) inputs like 'FF' or 'C0FFEE'."
                    }
                ]}
                benefits={[
                    "Debug memory addresses.",
                    "Convert color codes.",
                    "Understand binary logic.",
                    "Learn computer math."
                ]}
                faqs={[
                    {
                        question: "What is the maximum base supported?",
                        answer: "Our calculator supports bases up to 36. This uses digits 0-9 combined with all letters of the alphabet (A-Z), where A=10 and Z=35."
                    },
                    {
                        question: "Why is Hexadecimal (Hex) so popular?",
                        answer: "Hex is a 'short-hand' for binary. One Hex digit represents exactly 4 binary bits (a nibble). It's easier to read 'FF' than '11111111'."
                    },
                    {
                        question: "How do I denote a base?",
                        answer: "In math: subscript (101₂). In code: 0b (Binary), 0x (Hex), 0o (Octal)."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Base Converter",
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Binary Conversion, Hex Conversion, Octal Conversion, Base 36"
                }}
            />
        </div>
    );
}
