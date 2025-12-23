import type { Metadata } from 'next';
import ScientificCalculatorClient from './client';
import { SeoContentSection } from '@/components/seo/SeoContentSection';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Free Scientific Calculator - Advanced Math, Algebra & Trigonometry',
    description: 'A powerful, free online scientific calculator. Solve complex math problems, trigonometry (sin, cos, tan), logarithms, and exponents. Works offline.',
    keywords: ['scientific calculator', 'online calculator', 'trigonometry calculator', 'algebra calculator', 'free math tool', 'offline calculator'],
    alternates: {
        canonical: 'https://unitmaster.io/calculators/students/scientific',
    },
};

export default function ScientificCalculatorPage() {
    return (
        <div className="space-y-8">
            <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                <h1 className="text-3xl font-bold mb-2">Scientific Calculator</h1>
                <p className="text-muted-foreground">Professional-grade mathematical tool for students and engineers.</p>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <ScientificCalculatorClient />
            </div>

            <SeoContentSection
                title="Your Free Online Scientific Calculator"
                description={`
                    <p>Stop carrying around a bulky TI-84. Our <strong>Free Scientific Calculator</strong> brings powerful mathematical capabilities directly to your browser. Whether you are solving trigonometry problems for your Physics homework or calculating complex exponentials for Engineering, this tool is designed to be fast, accurate, and reliable.</p>
                    
                    <h3>Key Capabilities</h3>
                    <p>Unlike basic calculators, a scientific calculator includes functions that go beyond simple arithmetic:</p>
                    <ul>
                        <li><strong>Trigonometry:</strong> Calculate Sine (sin), Cosine (cos), and Tangent (tan) instantly. Perfect for geometry and physics vectors.</li>
                        <li><strong>Logarithms:</strong> Solve for <em>ln</em> (Natural Log) and standard <em>log</em> (Base 10) equations.</li>
                        <li><strong>Exponents & Roots:</strong> Easily compute square roots (√) and powers (x^y) for algebra.</li>
                    </ul>

                    <h3>Why Students Love UnitMaster?</h3>
                    <p>Most online calculators are riddled with ads or require an internet connection. UnitMaster is part of our <strong>Privacy-First</strong> initiative. Once this page loads, you can turn off your Wi-Fi and still calculate everything strictly on your device. We never track your equations or store your history on our servers.</p>

                    <p><strong>Pro Tip:</strong> You can use your keyboard! Type numbers and operators (+, -, *, /) directly. Use 'Enter' to solve and 'Backspace' to correct errors.</p>
                `}
                features={[
                    {
                        title: "Offline Ready",
                        description: "Built with Progressive Web App (PWA) technology. Works even without an internet connection."
                    },
                    {
                        title: "Advanced Functions",
                        description: "Includes PI (π), Euler's number (e), absolute values, and full parenthesis support for complex order of operations."
                    },
                    {
                        title: "History Tape",
                        description: "Automatically saves your last 5 calculations so you can triple-check your homework answers."
                    }
                ]}
                benefits={[
                    "Completely Free (No Subscription).",
                    "No 'Sign Up' required to use.",
                    "Mobile-Responsive Grid Layout.",
                    "Dark Mode Compatible."
                ]}
                faqs={[
                    {
                        question: "What is the difference between a normal and scientific calculator?",
                        answer: "A normal (or standard) calculator only performs basic arithmetic: addition, subtraction, multiplication, and division. A **Scientific Calculator** adds advanced functions needed for higher-level math like calculus, trigonometry, and engineering statistics."
                    },
                    {
                        question: "Does this calculator follow Order of Operations (PEMDAS)?",
                        answer: "Yes. Our calculator strictly follows the mathematical order of operations: Parentheses first, then Exponents, Multiplication/Division, and finally Addition/Subtraction."
                    },
                    {
                        question: "Can I use this for the SAT/ACT?",
                        answer: "This is a web-based tool, so you cannot use it *during* the actual exam (where phones/laptops are banned). However, it is functionally identical to the approved physical calculators, making it perfect for study and practice."
                    },
                    {
                        question: "How do I calculate a square root?",
                        answer: "Press the **√** button followed by the number you want to find the root of. For example, `√` then `9` will output `3`. You can also combine it with other operations."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Scientific Calculator",
                    "applicationCategory": "EducationalApplication",
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
                    { name: 'Student Tools', path: '/calculators/students' },
                    { name: 'Scientific Calculator', path: '/calculators/students/scientific' }
                ]}
            />
        </div>
    );
}
