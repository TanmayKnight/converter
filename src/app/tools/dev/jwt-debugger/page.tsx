import type { Metadata } from 'next';
import JwtDebuggerClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'JWT Debugger - Decode & Inspector Offline | UnitMaster',
    description: 'Free online JWT Debugger. Decode JSON Web Tokens, inspect headers and payloads, and debug claims instantly. Client-side secure (No Server Calls).',
    keywords: ['jwt debugger offline', 'decode jwt local', 'jwt inspector privacy', 'json web token no upload', 'jwt decoder local'],
};

export default function JwtDebuggerPage() {
    return (
        <div className="space-y-8">
            <JwtDebuggerClient />

            <SeoContentSection
                title="Secure Offline JWT Debugger"
                description="JWT (JSON Web Token) is the open standard for secure information exchange. UnitMaster's debugger allows you to paste and inspect tokens instantly without them ever leaving your browser. A 'Must-Have' for privacy-conscious developers."
                features={[
                    {
                        title: "100% Client-Side",
                        description: "Your tokens never touch our server. This is critical for security, as you should never paste real JWTs into online tools that send data to a backend."
                    },
                    {
                        title: "Header / Payload / Signature",
                        description: "We automatically split and color-code the token into its three core components for easy debugging."
                    },
                    {
                        title: "Expiration Parsing",
                        description: "Instantly see when a token expires (exp) or was issued (iat) in a human-readable date format."
                    }
                ]}
                benefits={[
                    "Debug authentication issues.",
                    "Verify token claims.",
                    "Check expiration dates.",
                    "Securely inspect production tokens."
                ]}
                faqs={[
                    {
                        question: "What is a JWT?",
                        answer: "JWT (JSON Web Token) is an open standard (RFC 7519) for compact, URL-safe means of representing claims to be transferred between two parties, typically used for authentication."
                    },
                    {
                        question: "Is JWT data encrypted?",
                        answer: "No. JWTs are encoded (Base64), not encrypted. Their contents can be read by anyone. Do not store sensitive information like passwords in a JWT."
                    },
                    {
                        question: "What are the three parts of a JWT?",
                        answer: "A JWT consists of three parts separated by dots: the Header (algorithm), the Payload (data claims), and the Signature (verification)."
                    },
                    {
                        question: "Is it safe to paste my token here?",
                        answer: "Yes, precisely because UnitMaster runs offline in your browser. Unlike other sites, we do NOT possess a backend that could log your tokens."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "JWT Debugger",
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "featureList": "JWT Decoding, Token Inspection, Expiration Check, Local Privacy"
                }}
            />
        </div>
    );
}
