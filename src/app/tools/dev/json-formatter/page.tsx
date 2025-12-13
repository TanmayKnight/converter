import type { Metadata } from 'next';
import JsonFormatterClient from './client';

export const metadata: Metadata = {
    title: 'JSON Formatter & Validator - Beautify JSON Online | UnitMaster',
    description: 'Free online JSON Formatter. Beautify, minify, and validate JSON code. Privacy-focused tool running securely in your browser.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'format json online', 'json minify'],
    alternates: {
        canonical: '/tools/dev/json-formatter',
    },
    openGraph: {
        title: 'JSON Formatter & Validator - Beautify JSON Online',
        description: 'Free online JSON Formatter. Beautify, minify, and validate JSON code securely in your browser.',
        type: 'website',
        url: '/tools/dev/json-formatter',
    },
};

export default function JsonFormatterPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'JSON Formatter',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Free online JSON formatter and validator. Beautify and minify JSON data locally.',
        featureList: 'JSON Formatting, JSON Minification, Syntax Validation',
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <JsonFormatterClient />
        </>
    );
}
