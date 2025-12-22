import Link from 'next/link';
import { Metadata } from 'next';
import {
    Monitor,
    Smartphone,
} from 'lucide-react';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Free Technology Calculators - PX to REM & Screen Density | UnitMaster',
    description: 'Essential developer tools. Convert Pixels to REM for responsive web design. Privacy-first and works offline.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/technology',
    },
    openGraph: {
        title: 'Free Technology Calculators | UnitMaster',
        description: 'Developer utilities for modern web development.',
        url: 'https://unitmaster.io/calculators/technology',
        type: 'website',
    },
};

const tools = [
    {
        name: 'PX to REM Converter',
        slug: 'px-to-rem',
        icon: Monitor,
        desc: 'Convert Pixels to REM units for responsive CSS typography.'
    },
];

export default function TechnologyCalculatorsPage() {
    return (
        <div className="space-y-12 container mx-auto px-4 py-12 max-w-screen-xl">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 mb-4">
                    <Smartphone className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Technology Calculators</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Tools for the modern web.
                    Simplify your development workflow with our offline utilities.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/calculators/technology/${tool.slug}`}
                        className="group relative bg-card hover:bg-gradient-to-br from-card to-indigo-500/5 border border-border hover:border-indigo-500/30 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 transition-colors">
                                <tool.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
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
                    { name: 'Technology Calculators', path: '/calculators/technology' }
                ]}
            />
        </div>
    );
}
