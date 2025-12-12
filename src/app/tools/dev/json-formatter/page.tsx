import type { Metadata } from 'next';
import JsonFormatterClient from './client';

export const metadata: Metadata = {
    title: 'JSON Formatter & Validator - Beautify JSON Online | UnitMaster',
    description: 'Free online JSON Formatter. Beautify, minify, and validate JSON code. Privacy-focused tool running securely in your browser.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'format json online', 'json minify'],
};

export default function JsonFormatterPage() {
    return <JsonFormatterClient />;
}
