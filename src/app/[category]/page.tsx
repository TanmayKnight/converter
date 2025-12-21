import { notFound } from 'next/navigation';
import Link from 'next/link';
import { unitDefinitions, UnitCategory, CategoryDefinition } from '@/lib/units/definitions';
import { categoryFacts } from '@/lib/content/category-facts';
import { ConverterWidget } from '@/components/Converter';
import { AdUnit } from '@/components/AdUnit';
import { Metadata } from 'next';
import { ArrowRight, ArrowLeft, Lightbulb, Briefcase, BookOpen } from 'lucide-react';

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
        <div className="container mx-auto px-4 py-4 max-w-screen-xl">

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-foreground">{category.name} Converter</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                    Professional grade {category.name.toLowerCase()} conversion tool.
                    Instantly convert between {category.units.slice(0, 3).map(u => u.name).join(', ')} and more with precision.
                </p>
            </div>

            <div className="mb-8 md:mb-12 relative z-20">
                <ConverterWidget category={categoryId} />
            </div>

            {/* Did You Know - Insight Card (Moved Below Tool) */}
            {categoryFacts[categoryId] && (
                <div className="max-w-2xl mx-auto mb-12 md:mb-16 transform hover:-translate-y-1 transition-transform duration-300 px-2 md:px-0">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/10 border border-amber-200/50 dark:border-amber-900/50 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Lightbulb className="w-24 h-24 text-amber-500" />
                        </div>
                        <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-start text-left">
                            <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-xl shrink-0">
                                <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-1 flex items-center gap-2">
                                    Quick Fact
                                    <span className="text-[10px] uppercase tracking-wider bg-amber-200/50 dark:bg-amber-800/50 px-2 py-0.5 rounded-full">Did You Know?</span>
                                </h3>
                                <p className="text-amber-800/80 dark:text-amber-200/80 leading-relaxed font-medium">
                                    {categoryFacts[categoryId].didYouKnow}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div className="mb-16">
                <AdUnit className="max-w-3xl mx-auto" slotId="category-footer-slot" />
            </div>

            {/* Knowledge Panel - SEO Content */}
            {categoryFacts[categoryId] && (
                <section aria-labelledby="knowledge-heading" className="max-w-4xl mx-auto mb-20">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Usage Column */}
                        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
                                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Common Applications</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {categoryFacts[categoryId].commonUses}
                            </p>
                        </div>

                        {/* History Column */}
                        {categoryFacts[categoryId].history && (
                            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mb-6">
                                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Historical Context</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {categoryFacts[categoryId].history}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">Common {category.name} Conversions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 not-prose">

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
            </div >
        </div >
    );
}
