import type { Metadata } from 'next';
import AsciiConverterClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'ASCII Converter - Text to Hex, Binary, Decimal Offline',
    description: 'Convert text to ASCII codes instantly. Translate strings to Hexadecimal, Binary, and Decimal formats locally in your browser.',
    keywords: ['ascii converter offline', 'text to binary local', 'text to hex', 'ascii table', 'string to ascii no upload'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/ascii',
    },
};

export default function AsciiPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">ASCII Text Converter</h1>
                <p className="text-muted-foreground">Convert text to Binary, Hexadecimal, and Decimal ASCII codes.</p>
            </div>

            <AsciiConverterClient />

            <SeoContentSection
                title="What is ASCII?"
                description="ASCII (American Standard Code for Information Interchange) is the standard for electronic communication. Computers don't understand letters; they only understand numbers. ASCII assigns a unique number to every character."
                features={[
                    {
                        title: "100% Privacy",
                        description: "Your text is converted locally. We never send your strings to a server, ensuring no one reads your data."
                    },
                    {
                        title: "Dec / Hex / Bin",
                        description: "View the Decimal, Hexadecimal, and Binary representation of every character side-by-side."
                    },
                    {
                        title: "0-127 Standard",
                        description: "Support for all standard ASCII control characters and printable symbols."
                    }
                ]}
                benefits={[
                    "Debug data streams.",
                    "Learn computer architecture.",
                    "Encode hidden messages.",
                    "Understand binary logic."
                ]}
                faqs={[
                    {
                        question: "Why are there separate uppercase and lowercase codes?",
                        answer: "Computers treat 'A' (65) and 'a' (97) as different characters. The difference is exactly 32 (or the 6th bit), allowing easy case conversion."
                    },
                    {
                        question: "How many characters does ASCII support?",
                        answer: "Standard ASCII uses 7 bits (128 characters). Extended ASCII uses 8 bits (256 characters) to include foreign letters and box-drawing symbols."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "ASCII Converter",
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "ASCII to Text, Text to Binary, Text to Hex, Local Processing"
                }}
            />
        </div>
    );
}
