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

            <div className="container mx-auto px-4 py-12 max-w-7xl prose prose-neutral dark:prose-invert">
                <h2>JSON Best Practices & Debugging Guide</h2>
                <p>
                    <strong>JSON (JavaScript Object Notation)</strong> has eaten the world. It is the de-facto standard for data exchange on the web, replacing the verbose XML of the past.
                    But despite its simplicity, it is notoriously strict. A single misplaced comma can crash your entire API.
                </p>

                <h3>Common JSON Errors (And How to Fix Them)</h3>
                <p>
                    If our validator is screaming at you, check these usual suspects:
                </p>
                <ol>
                    <li><strong>Trailing Commas</strong>: In JavaScript, leaving a comma after the last item in an array is fine `[1, 2,]`. In JSON, it is a <strong>syntax error</strong>.</li>
                    <li><strong>Single Quotes</strong>: JSON requires double quotes `"` for all strings and key names. Single quotes `'` are strictly forbidden.</li>
                    <li><strong>Comments</strong>: True JSON does not support comments (`//` or `/* */`). If you need comments for configuration files, consider using <strong>JSON5</strong> or YAML instead.</li>
                </ol>

                <h3>Pretty Print vs. Minify</h3>
                <p>
                    <strong>Pretty Printing</strong> (Beautifying) adds indentation and newlines to make the code human-readable. It is essential for debugging API responses.
                </p>
                <p>
                    <strong>Minification</strong> removes all unnecessary whitespace. This is crucial for production data transmission.
                    Minifying a large JSON payload can reduce its size by 30-40%, leading to faster load times and lower bandwidth costs.
                </p>

                <h3>JSON vs. XML</h3>
                <p>
                    Why did JSON win?
                </p>
                <ul>
                    <li><strong>Lightweight</strong>: No closing tags means fewer bytes.</li>
                    <li><strong>Native</strong>: It parses natively into JavaScript objects, making it seamless for web development.</li>
                    <li><strong>Readability</strong>: Its key-value pair structure is easier for humans to scan than nested XML nodes.</li>
                </ul>

                <h3>Security Note</h3>
                <p>
                    Never paste production JSON containing API keys, passwords, or PII (Personal Identifiable Information) into online formatters that send data to a server.
                    <strong>UnitMaster is different.</strong> We process your JSON locally in your browser. Your sensitive data loop never leaves your machine.
                </p>
            </div>
        </>
    );
}
