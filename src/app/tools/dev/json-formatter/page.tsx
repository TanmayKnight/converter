import type { Metadata } from 'next';
import JsonFormatterClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'JSON Formatter & Validator - Beautify & Minify Offline | UnitMaster',
    description: 'Free online JSON Formatter. Beautify, minify, and validate JSON code. Privacy-focused tool running securely in your browser (Local).',
    keywords: ['json formatter offline', 'json validator local', 'json beautifier privacy', 'format json online secure', 'json minify no server'],
    alternates: {
        canonical: '/tools/dev/json-formatter',
    },
    openGraph: {
        title: 'JSON Formatter & Validator - Beautify JSON Offline',
        description: 'Free online JSON Formatter. Beautify, minify, and validate JSON code securely in your browser. No data leaves your device.',
        type: 'website',
        url: '/tools/dev/json-formatter',
    },
};

export default function JsonFormatterPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 max-w-7xl pt-8 pb-4">
                <div className="text-center space-y-4 mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        JSON Formatter & Validator
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Beautify, minify, and validate your JSON data. Processed locally in your browser for privacy.
                    </p>
                </div>

                <JsonFormatterClient />
            </div>

            <SeoContentSection
                title="JSON Best Practices & Debugging (Offline)"
                description="JSON (JavaScript Object Notation) is the standard for data exchange. UnitMaster provides a secure, offline environment to debug and format your JSON data without sending sensitive API keys or user data to a server."
                features={[
                    {
                        title: "100% Private (Local Processing)",
                        description: "Unlike other formatters, we never send your JSON to a backend. Validation happens right in your Chrome/Firefox/Safari browser."
                    },
                    {
                        title: "Pretty Print & Minify",
                        description: "Instantly switch between readable (Beautify) and compact (Minify) formats for production use."
                    },
                    {
                        title: "Error Detection",
                        description: "Quickly spot syntax errors like trailing commas, single quotes, or missing brackets."
                    },
                    {
                        title: "Collapsible Output",
                        description: "navigate deep nested JSON structures with ease using our interactive viewer."
                    }
                ]}
                benefits={[
                    "Debug API responses securely.",
                    "Format configuration files.",
                    "Minify payloads for lower bandwidth.",
                    "No risk of data leaks."
                ]}
                faqs={[
                    {
                        question: "Why is my JSON invalid?",
                        answer: "Common reasons include using single quotes (JSON requires double quotes), trailing commas (strictly forbidden in JSON), or unquoted keys. Our tool highlights these errors for you."
                    },
                    {
                        question: "What is the difference between prettify and minify?",
                        answer: "Prettify adds whitespace and indentation for human readability. Minify removes all extra characters to reduce file size for efficient transmission (up to 40% smaller)."
                    },
                    {
                        question: "Is this JSON formatter secure?",
                        answer: "Yes. UnitMaster JSON Formatter runs entirely in your browser using JavaScript. No data is sent to the server, ensuring your private keys and data remain private."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "JSON Formatter",
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "JSON Formatting, JSON Minification, Syntax Validation, Local Privacy"
                }}
            />
        </div>
    );
}
