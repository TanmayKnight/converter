import type { Metadata } from 'next';
import WordsConverterClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Numbers to Words Converter - Check Writing Helper | UnitMaster',
    description: 'Convert numerical digits to written words instantly (e.g. 100 -> One Hundred). Useful for check writing and legal documents. Works offline.',
    keywords: ['numbers to words', 'check writer', 'number converter', 'write number as text', 'digits to text', 'offline converter'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math/words',
    },
};

export default function WordsPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Number to Words</h1>
                <p className="text-muted-foreground">Convert numerical digits into written words.</p>
            </div>

            <WordsConverterClient />

            <SeoContentSection
                title="Why Write Numbers as Words?"
                description="Writing numbers as words is often required in formal situations to prevent fraud or confusion. Digits (1, 2, 3) are easy to alter. An extra zero can change $100 to $1000. Words ('One Hundred') are much harder to forge."
                features={[
                    {
                        title: "Fraud Prevention",
                        description: "Essential for filling out bank checks and legal contracts where precision matters."
                    },
                    {
                        title: "Formal Text",
                        description: "Generate elegant text for invitations ('The Fourth of July') instead of digits."
                    },
                    {
                        title: "100% Privacy",
                        description: "Your financial numbers are converted locally and never sent to a server."
                    }
                ]}
                benefits={[
                    "Write checks correctly.",
                    "Draft legal contracts.",
                    "Avoid ambiguity.",
                    "Secure & Private."
                ]}
                faqs={[
                    {
                        question: "How do you write cents on a check?",
                        answer: "Cents are usually written as a fraction over 100. Example: $150.25 is written as 'One Hundred Fifty and 25/100'."
                    },
                    {
                        question: "Should I use 'And'?",
                        answer: "In formal Math, 'And' denotes a decimal point. However, in casual British English, 'One Hundred and Fifty' is common. Our tool follows standard check-writing conventions."
                    },
                    {
                        question: "How do you write 1000 in words?",
                        answer: "One Thousand."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Numbers to Words Converter",
                    "applicationCategory": "FinanceApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "Number to Text, Check Writing Helper, Offline Processing"
                }}
            />

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Math Calculators', path: '/calculators/math' },
                    { name: 'Numbers to Words Converter', path: '/calculators/math/words' }
                ]}
            />
        </div>
    );
}
