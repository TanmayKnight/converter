import Link from 'next/link';
import { Metadata } from 'next';
import {
    Calculator,
    Percent,
    Sigma,
    Binary,
    ArrowLeftRight,
    Hash,
    BarChart3,
    Coins,
    Triangle,
    Type
} from 'lucide-react';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Free Math Calculators - Algebra, Statistics, Percentage & More | UnitMaster',
    description: 'A comprehensive collection of free math calculators. Solve algebra, statistics, trigonometry, and percentage problems instantly and offline. Private & Secure.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/math',
    },
    openGraph: {
        title: 'Free Math Calculators | UnitMaster',
        description: 'Solve complex math problems with our privacy-first calculators.',
        url: 'https://unitmaster.io/calculators/math',
        type: 'website',
    },
};

const tools = [
    {
        name: 'Percentage Calculator',
        slug: 'percentage',
        icon: Percent,
        desc: 'Calculate percentage difference, increase/decrease, or parts of a whole.'
    },
    {
        name: 'Algebra Solver',
        slug: 'algebra',
        icon: Sigma,
        desc: 'Solve linear and quadratic equations instantly.'
    },
    {
        name: 'ASCII Converter',
        slug: 'ascii',
        icon: Binary,
        desc: 'Convert text to ASCII codes and vice versa.'
    },
    {
        name: 'Base Converter',
        slug: 'base',
        icon: ArrowLeftRight,
        desc: 'Convert numbers between Binary, Octal, Decimal, and Hexadecimal.'
    },
    {
        name: 'Roman Numerals',
        slug: 'roman',
        icon: Hash,
        desc: 'Convert numbers to Roman numerals and back.'
    },
    {
        name: 'Statistics Calculator',
        slug: 'statistics',
        icon: BarChart3,
        desc: 'Calculate mean, median, mode, variance, and standard deviation.'
    },
    {
        name: 'Tip Calculator',
        slug: 'tip',
        icon: Coins,
        desc: 'Calculate tips per person and split bills easily.'
    },
    {
        name: 'Trigonometry',
        slug: 'trigonometry',
        icon: Triangle,
        desc: 'Calculate sine, cosine, tangent and other trigonometric functions.'
    },
    {
        name: 'Words to Numbers',
        slug: 'words',
        icon: Type,
        desc: 'Convert written words (e.g., "one hundred") into numbers.'
    },
];

export default function MathCalculatorsPage() {
    return (
        <div className="space-y-12 container mx-auto px-4 py-12 max-w-screen-xl">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-500/10 text-blue-600 mb-4">
                    <Calculator className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Math Calculators</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Powerful mathematical tools for students and professionals.
                    Solve problems instantly in your browser with complete privacy.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/calculators/math/${tool.slug}`}
                        className="group relative bg-card hover:bg-gradient-to-br from-card to-blue-500/5 border border-border hover:border-blue-500/30 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 transition-colors">
                                <tool.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                            {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {tool.desc}
                        </p>
                    </Link>
                ))}
            </div>

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Math Calculators', path: '/calculators/math' }
                ]}
            />
        </div>
    );
}
