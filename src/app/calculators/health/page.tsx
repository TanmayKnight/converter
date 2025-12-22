import Link from 'next/link';
import { Metadata } from 'next';
import {
    Activity,
    Heart,
} from 'lucide-react';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Free Health Calculators - BMI & Fitness | UnitMaster',
    description: 'Monitor your health with our free BMI calculator. Private, secure, and offline tools for fitness enthusiasts and health professionals.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/health',
    },
    openGraph: {
        title: 'Free Health Calculators | UnitMaster',
        description: 'Track your fitness goals with our privacy-first health calculators.',
        url: 'https://unitmaster.io/calculators/health',
        type: 'website',
    },
};

const tools = [
    {
        name: 'BMI Calculator',
        slug: 'bmi',
        icon: Activity,
        desc: 'Calculate Body Mass Index (BMI) to understand your weight category.'
    },
];

export default function HealthCalculatorsPage() {
    return (
        <div className="space-y-12 container mx-auto px-4 py-12 max-w-screen-xl">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-red-500/10 text-red-600 mb-4">
                    <Heart className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Health Calculators</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Simple tools to track your well-being.
                    Calculate important health metrics instantly and privately.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/calculators/health/${tool.slug}`}
                        className="group relative bg-card hover:bg-gradient-to-br from-card to-red-500/5 border border-border hover:border-red-500/30 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-red-500/10 text-red-600 transition-colors">
                                <tool.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
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
                    { name: 'Health Calculators', path: '/calculators/health' }
                ]}
            />
        </div>
    );
}
