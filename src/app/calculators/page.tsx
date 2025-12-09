import Link from 'next/link';
import { Calculator, Heart, DollarSign, TrendingUp, Percent, Activity } from 'lucide-react';

const calculators = [
    {
        category: 'Finance',
        icon: DollarSign,
        tools: [
            { name: 'Mortgage Calculator', slug: 'finance/mortgage', icon: Calculator, desc: 'Estimate monthly payments and total interest.' },
            { name: 'Loan Calculator', slug: 'finance/loan', icon: Percent, desc: 'Calculate amortization and payment schedules.' },
            { name: 'ROI Calculator', slug: 'finance/roi', icon: TrendingUp, desc: 'Measure the return on your investments.' },
        ],
    },
    {
        category: 'Health',
        icon: Heart,
        tools: [
            { name: 'BMI Calculator', slug: 'health/bmi', icon: Activity, desc: 'Calculate Body Mass Index for health tracking.' },
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
                    Precise, professional tools for your financial and health decisions.
                    Free to use and engineering-grade accurate.
                </p>
            </div>

            <div className="grid gap-12">
                {calculators.map((cat) => (
                    <div key={cat.category}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                <cat.icon className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-bold">{cat.category} Tools</h2>
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
                    </div>
                ))}
            </div>
        </div>
    );
}
