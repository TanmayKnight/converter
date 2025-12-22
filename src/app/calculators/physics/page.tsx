import Link from 'next/link';
import { Metadata } from 'next';
import {
    Atom,
    Zap,
    Scale,
} from 'lucide-react';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Free Physics Calculators - Force & Ohm\'s Law | UnitMaster',
    description: 'Solve physics problems with our free calculators. Calculate Force (F=ma) and Ohm\'s Law (Voltage, Current, Resistance) offline. Perfect for students.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/physics',
    },
    openGraph: {
        title: 'Free Physics Calculators | UnitMaster',
        description: 'Master physics concepts with our privacy-first calculators.',
        url: 'https://unitmaster.io/calculators/physics',
        type: 'website',
    },
};

const tools = [
    {
        name: 'Force Calculator (F=ma)',
        slug: 'force-mass',
        icon: Scale,
        desc: 'Calculate Force, Mass, or Acceleration using Newton\'s Second Law.'
    },
    {
        name: 'Ohm\'s Law Calculator',
        slug: 'ohms-law',
        icon: Zap,
        desc: 'Calculate Voltage, Current, or Resistance in an electrical circuit.'
    },
];

export default function PhysicsCalculatorsPage() {
    return (
        <div className="space-y-12 container mx-auto px-4 py-12 max-w-screen-xl">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-purple-500/10 text-purple-600 mb-4">
                    <Atom className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Physics Calculators</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore the laws of the universe.
                    Solve physics equations instantly in your browser.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/calculators/physics/${tool.slug}`}
                        className="group relative bg-card hover:bg-gradient-to-br from-card to-purple-500/5 border border-border hover:border-purple-500/30 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 transition-colors">
                                <tool.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
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
                    { name: 'Physics Calculators', path: '/calculators/physics' }
                ]}
            />
        </div>
    );
}
