import type { Metadata } from 'next';
import PxRemConverterClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'PX to REM Converter - CSS Unit Calculator',
    description: 'Instantly convert Pixels (px) to REM units. The best tool for responsive web design and accessible CSS development. Works offline.',
    keywords: ['px to rem', 'rem to px', 'css converter', 'web design calculator', 'css units', 'responsive typography'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/technology/px-to-rem',
    },
};

export default function PxRemPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">PX to REM Converter</h1>
                <p className="text-muted-foreground">Essential tool for responsive web design.</p>
            </div>

            <PxRemConverterClient />

            <SeoContentSection
                title="Responsive Typography: Why use REM?"
                description="PX (Pixel) is an absolute unit that does not scale. REM (Root EM) is a relative unit that scales based on the user's browser font size settings. Using REM improves accessibility and responsive design."
                features={[
                    {
                        title: "Accessibility Ready",
                        description: "Respects user font preferences. If a visually impaired user scales their browser font, your site scales with it."
                    },
                    {
                        title: "Base Size Config",
                        description: "Customize the base font size (usually 16px) for your specific project needs."
                    },
                    {
                        title: "Dual Conversion",
                        description: "Convert PX to REM or REM to PX instantly."
                    }
                ]}
                benefits={[
                    "Web accessibility compliance.",
                    "Modern CSS practices.",
                    "Responsive layouts.",
                    "100% Client-side."
                ]}
                faqs={[
                    {
                        question: "Why is 16px the default?",
                        answer: "Most modern browsers have a default font size of 16px. This is the industry standard starting point for web typography."
                    },
                    {
                        question: "Should I use REM for padding and margins?",
                        answer: "Yes! Using REM for spacing (margins/padding) ensures that your layout breathes and scales correctly along with the text content. Using PX for spacing can lead to crowded layouts when text size increases."
                    },
                    {
                        question: "What is a REM unit?",
                        answer: "REM stands for Root EM. It is a CSS unit relative to the font-size of the root element (HTML tag)."
                    },
                    {
                        question: "How do you convert px to rem?",
                        answer: "Divide the pixel value by the root font size (usually 16px). For example, 16px / 16 = 1rem."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "PX to REM Converter",
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Technology Calculators', path: '/calculators/technology' },
                    { name: 'PX to REM Converter', path: '/calculators/technology/px-to-rem' }
                ]}
            />
        </div>
    );
}
