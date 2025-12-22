import Link from 'next/link';
import {
    Calculator,
    Heart,
    DollarSign,
    TrendingUp,
    Percent,
    Activity,
    Box,
    Atom,
    Smartphone,
    Scale,
    Zap,
    Monitor,
    Ruler,
    Binary,
    Sigma
} from 'lucide-react';

const calculators = [
    {
        category: 'Finance',
        icon: DollarSign,
        slug: 'finance',
        tools: [
            { name: 'Mortgage Calculator', slug: 'finance/mortgage', icon: DollarSign, desc: 'Estimate monthly payments and PMI.' },
            { name: 'Loan Calculator', slug: 'finance/loan', icon: Calculator, desc: 'Simple personal loan estimation.' },
            { name: 'ROI Calculator', slug: 'finance/roi', icon: TrendingUp, desc: 'Measure investment returns.' },
            { name: 'Tax Calculator', slug: 'finance/tax', icon: Percent, desc: 'GST and VAT invoices.' },
            { name: 'Investment', slug: 'finance/investment', icon: TrendingUp, desc: 'SIP and Lumpsum projections.' },
            { name: 'Retirement', slug: 'finance/retirement', icon: Heart, desc: 'Plan for financial freedom.' },
        ],
    },
    {
        category: 'Math',
        icon: Calculator,
        slug: 'math',
        tools: [
            { name: 'Percentage', slug: 'math/percentage', icon: Percent, desc: 'Increase, decrease, and difference.' },
            { name: 'Algebra', slug: 'math/algebra', icon: Sigma, desc: 'Roots, exponents, logs.' },
            { name: 'ASCII', slug: 'math/ascii', icon: Binary, desc: 'Text to binary/hex.' },
            { name: 'Base Converter', slug: 'math/base', icon: Binary, desc: 'Binary, Octal, Hex.' },
            { name: 'Roman Numerals', slug: 'math/roman', icon: Calculator, desc: 'Convert numbers to Roman.' },
            { name: 'Statistics', slug: 'math/statistics', icon: TrendingUp, desc: 'Permutations and Combinations.' },
            { name: 'Tip Calculator', slug: 'math/tip', icon: DollarSign, desc: 'Split bills instantly.' },
            { name: 'Trigonometry', slug: 'math/trigonometry', icon: Ruler, desc: 'Sin, Cos, Tan functions.' },
            { name: 'Words to Numbers', slug: 'math/words', icon: Calculator, desc: 'Convert text to digits.' },
        ],
    },
    {
        category: 'Geometry',
        icon: Box,
        slug: 'geometry',
        tools: [
            { name: 'Area', slug: 'geometry/area', icon: Ruler, desc: 'Circle, Triangle, Square area.' },
            { name: 'Volume', slug: 'geometry/volume', icon: Box, desc: 'Cube, Cylinder, Sphere volume.' },
        ],
    },
    {
        category: 'Physics',
        icon: Atom,
        slug: 'physics',
        tools: [
            { name: 'Force (F=ma)', slug: 'physics/force-mass', icon: Scale, desc: 'Newton\'s Second Law.' },
            { name: 'Ohm\'s Law', slug: 'physics/ohms-law', icon: Zap, desc: 'Voltage, Current, Resistance.' },
        ],
    },
    {
        category: 'Health',
        icon: Heart,
        slug: 'health',
        tools: [
            { name: 'BMI Calculator', slug: 'health/bmi', icon: Activity, desc: 'Body Mass Index tracking.' },
        ],
    },
    {
        category: 'Technology',
        icon: Smartphone,
        slug: 'technology',
        tools: [
            { name: 'PX to REM', slug: 'technology/px-to-rem', icon: Monitor, desc: 'CSS unit conversion.' },
        ],
    },
];

export default function CalculatorsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-screen-xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Premium Calculators
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Precise, professional tools for engineering, finance, and science.
                    Free to use, privacy-first, and works offline.
                </p>
            </div>

            <div className="space-y-16">
                {calculators.map((cat) => (
                    <div key={cat.category} id={cat.category.toLowerCase()}>
                        <div className="flex items-center gap-3 mb-6 border-b pb-4">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                <cat.icon className="h-6 w-6" />
                            </div>
                            <Link href={`/calculators/${cat.slug}`} className="hover:underline">
                                <h2 className="text-2xl font-bold">{cat.category} Tools</h2>
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cat.tools.map((tool) => (
                                <Link
                                    key={tool.slug}
                                    href={`/calculators/${tool.slug}`}
                                    className="group relative bg-card hover:bg-gradient-to-br from-card to-primary/5 border border-border hover:border-primary/30 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-secondary group-hover:bg-background transition-colors">
                                            <tool.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs font-bold uppercase tracking-wider py-1 px-2 rounded-full bg-primary/10">
                                            Open
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {tool.desc}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-4 text-right">
                            <Link href={`/calculators/${cat.slug}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                                View all {cat.category} Converters &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
