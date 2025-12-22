import Link from 'next/link';
import { Metadata } from 'next';
import {
    Box,
    BoxSelect,
    Ruler,
} from 'lucide-react';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';

export const metadata: Metadata = {
    title: 'Free Geometry Calculators - Area & Volume | UnitMaster',
    description: 'Calculate Area and Volume for various shapes (Circle, Triangle, Rectangle, Cylinder, Sphere) instantly and offline. Private & Secure.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/geometry',
    },
    openGraph: {
        title: 'Free Geometry Calculators | UnitMaster',
        description: 'Solve geometry problems with our privacy-first calculators.',
        url: 'https://unitmaster.io/calculators/geometry',
        type: 'website',
    },
};

const tools = [
    {
        name: 'Area Calculator',
        slug: 'area',
        icon: BoxSelect,
        desc: 'Calculate area of Circle, Triangle, Rectangle, Square, and Trapezoid.'
    },
    {
        name: 'Volume Calculator',
        slug: 'volume',
        icon: Box,
        desc: 'Calculate volume of Cube, Cylinder, Sphere, Cone, and Rectangular Prism.'
    },
];

export default function GeometryCalculatorsPage() {
    return (
        <div className="space-y-12 container mx-auto px-4 py-12 max-w-screen-xl">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-500/10 text-orange-600 mb-4">
                    <Ruler className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Geometry Calculators</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Visualize and solve geometry problems.
                    Calculate Area and Volume instantly in your browser.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/calculators/geometry/${tool.slug}`}
                        className="group relative bg-card hover:bg-gradient-to-br from-card to-orange-500/5 border border-border hover:border-orange-500/30 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 transition-colors">
                                <tool.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
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
                    { name: 'Geometry Calculators', path: '/calculators/geometry' }
                ]}
            />
        </div>
    );
}
