import type { Metadata } from 'next';
import RomanConverterClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Roman Numeral Converter - Date & Number to Roman Offline',
    description: 'Convert numbers to Roman Numerals (2024 -> MMXXIV) or Roman Numerals to Numbers instantly. Privacy-focused & Offline.',
    keywords: ['roman numeral converter offline', 'roman numerals date', 'number to roman local', 'roman to arabic', 'mmxxiv converter'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/roman',
    },
};

export default function RomanPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Roman Numeral Converter</h1>
                <p className="text-muted-foreground">Auto-detects Number to Roman OR Roman to Number.</p>
            </div>

            <RomanConverterClient />

            <SeoContentSection
                title="The Logic of Roman Numerals"
                description="Roman numerals originated in ancient Rome and remained the usual way of writing numbers throughout Europe. Today, we mostly use them for movie copyrights, Super Bowls, and fancy clock faces. UnitMaster helps you decode them securely."
                features={[
                    {
                        title: "Bidirectional Conversion",
                        description: "Type '2024' to get 'MMXXIV', or type 'XIV' to get '14'. Our tool detects the input type automatically."
                    },
                    {
                        title: "100% Private",
                        description: "Calculations happen in your browser. No server calls needed."
                    },
                    {
                        title: "Validation",
                        description: "Instantly flags invalid Roman combinations (like IIII instead of IV)."
                    }
                ]}
                benefits={[
                    "Decode movie release years.",
                    "Understand clock faces.",
                    "Verify Super Bowl numbers.",
                    "Learn ancient math."
                ]}
                faqs={[
                    {
                        question: "Is there a zero in Roman Numerals?",
                        answer: "No. The Romans had no symbol for Zero. They used the word 'nulla' (none). The concept of Zero came later."
                    },
                    {
                        question: "What is the largest number?",
                        answer: "Standard Roman numerals go up to 3,999 (MMMCMXCIX). Larger numbers require special symbols (vinculum) not supported by standard keyboards."
                    },
                    {
                        question: "How do you write 2024 in Roman Numerals?",
                        answer: "2024 is written as MMXXIV. (M=1000, M=1000, XX=20, IV=4)."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Roman Numeral Converter",
                    "applicationCategory": "EducationalApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Roman to Number, Number to Roman, Date Conversion, Offline Calculation"
                }}
            />

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Math Calculators', path: '/calculators/math' },
                    { name: 'Roman Numeral Converter', path: '/calculators/math/roman' }
                ]}
            />
        </div>
    );
}
