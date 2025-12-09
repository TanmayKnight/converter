import { notFound } from 'next/navigation';
import Link from 'next/link';
import { unitDefinitions, UnitCategory, CategoryDefinition } from '@/lib/units/definitions';
import { ConverterWidget } from '@/components/Converter';
import { AdUnit } from '@/components/AdUnit';
import { Metadata } from 'next';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

// Generate static params for all categories
export function generateStaticParams() {
    return Object.keys(unitDefinitions).map((category) => ({
        category,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categoryId } = await params;
    const category = unitDefinitions[categoryId as UnitCategory];
    if (!category) return {};

    return {
        title: `${category.name} Converter - Accurate & Free`,
        description: `Convert ${category.name} units instantly. Supports ${category.units.slice(0, 5).map(u => u.name).join(', ')} and more.`,
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: categoryIdParam } = await params;
    const categoryId = categoryIdParam as UnitCategory;
    const category = unitDefinitions[categoryId];

    if (!category) {
        notFound();
    }

    // Generate popular conversion links (first 10 units x first 10 units is too many, select a subset)
    // Let's just link to common base unit conversions
    const popularConversions = [];
    const units = category.units.slice(0, 8); // Top 8 units

    for (let i = 0; i < units.length; i++) {
        for (let j = 0; j < units.length; j++) {
            if (i !== j) {
                popularConversions.push({
                    from: units[i],
                    to: units[j],
                    slug: `${units[i].id}-to-${units[j].id}`
                });
            }
        }
    }

    // Limit links to 40 reasonable ones
    const displayedConversions = popularConversions.slice(0, 40);

    return (
        <div className="container mx-auto px-4 py-12 max-w-screen-xl">
            {/* Navigation Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                >
                    <div className="p-2 rounded-full bg-secondary group-hover:bg-primary/10 mr-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Back to Home
                </Link>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">{category.name} Converter</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Free and easy to use {category.name.toLowerCase()} converter.
                    Enter the value below to get instant results.
                </p>
            </div>

            <div className="mb-16">
                <ConverterWidget category={categoryId} />
            </div>

            <div className="mb-16">
                <AdUnit className="max-w-3xl mx-auto" slotId="category-footer-slot" />
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6 text-center">Common {category.name} Conversions</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 not-prose">
                    {displayedConversions.map((conv) => (
                        <Link
                            key={conv.slug}
                            href={`/${categoryId}/${conv.slug}`}
                            className="block p-3 text-sm font-medium text-center rounded-lg border border-border bg-card hover:bg-primary/5 hover:border-primary/30 transition-colors"
                        >
                            {conv.from.name} to {conv.to.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
