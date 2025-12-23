
import type { Metadata } from 'next';
import { CitationGenerator } from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Free Citation Generator - APA, MLA & Chicago Style | UnitMaster',
    description: 'Instant APA, MLA, and Chicago citations for websites and books. No ads, no signups, and 100% private. Runs entirely in your browser.',
    keywords: [
        'citation generator',
        'free apa citation generator',
        'mla citation maker',
        'chicago style citation',
        'bibliography maker',
        'reference generator',
        'no ad citation generator',
    ],
    openGraph: {
        title: 'Free Citation Generator - No Ads, No Signups | UnitMaster',
        description: 'Create perfect APA, MLA, and Chicago citations instantly. Private and free forever.',
        type: 'website',
    }
};

export default function CitationGeneratorPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Calculators', path: '/calculators' },
                    { name: 'Students', path: '/calculators/students' },
                    { name: 'Citation Generator', path: '/calculators/students/citation' },
                ]}
            />

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Free Citation Generator</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Create accurate citations for your bibliography in APA 7, MLA 9, and Chicago styles.
                </p>
            </div>

            <CitationGenerator />

            <div className="mt-16">
                <SeoContentSection
                    title="Why Use the UnitMaster Citation Generator?"
                    description="Most citation generators are cluttered with ads, popups, and paywalls. UnitMaster offers a clean, professional tool that respects your time and privacy. Whether you're writing a research paper, essay, or thesis, accuracy is paramount. Our tool formats your sources according to the latest style guides."
                    features={[
                        { title: "Ad-Free Experience", description: "Focus on your bibliography, not distraction." },
                        { title: "Multi-Style Support", description: "Switch between APA 7, MLA 9, and Chicago instantly." },
                        { title: "Privacy-First", description: "Your sources are processed locally. We don't track what you research." },
                        { title: "Copy to Clipboard", description: "One-click copying with proper formatting (italics/punctuation)." },
                    ]}
                    faqs={[
                        {
                            question: "Is this citation generator accurate?",
                            answer: "Yes. We follow the latest guidelines for APA 7th Edition, MLA 9th Edition, and Chicago Manual of Style (Author-Date)."
                        },
                        {
                            question: "How do I cite a website with no author?",
                            answer: "In our tool, simply leave the author field blank. The citation will automatically adjust to start with the title, as per standard style rules."
                        },
                        {
                            question: "Is it really free?",
                            answer: "Yes, 100% free with no limits. We believe educational tools should be accessible to everyone."
                        }
                    ]}
                    jsonLd={{
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "UnitMaster Citation Generator",
                        "applicationCategory": "EducationalApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "featureList": "APA Citation, MLA Citation, Chicago Style",
                        "about": {
                            "@type": "Thing",
                            "name": "Bibliography"
                        }
                    }}
                />
            </div>
        </div>
    );
}
