import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { unitDefinitions, UnitCategory, CategoryDefinition } from '@/lib/units/definitions';
import { ConverterWidget } from '@/components/Converter';
import { AdUnit } from '@/components/AdUnit';
import { JsonLdBreadcrumb } from '@/components/JsonLdBreadcrumb';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{
        category: string;
        conversion: string;
    }>;
}

// Optimization: Pre-render the most popular conversion pages for SEO.
// This ensures that when Googlebot visits e.g. /digital/terabyte-to-bit, it gets a static HTML file instantly.
export async function generateStaticParams() {
    const params: { category: string; conversion: string }[] = [];

    // Iterate through all categories
    for (const [categoryId, category] of Object.entries(unitDefinitions)) {
        // To keep build times reasonable, we only pre-render conversions between the top 8 units.
        // For a category with 10 units, 8x8 = 64 pages.
        // With ~20 categories, this is ~1200 static pages, which is manageable for Next.js.
        const topUnits = category.units.slice(0, 8);

        for (const fromUnit of topUnits) {
            for (const toUnit of topUnits) {
                if (fromUnit.id === toUnit.id) continue;

                params.push({
                    category: categoryId,
                    conversion: `${fromUnit.id}-to-${toUnit.id}`,
                });
            }
        }
    }

    return params;
}

// Next.js 15: Force dynamic rendering for paths NOT in generateStaticParams
// This means less popular conversions (e.g. unit #9 to unit #10) will still work via SSR.
export const dynamicParams = true;


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categoryIdParam, conversion } = await params;
    const categoryId = categoryIdParam as UnitCategory;
    const category = unitDefinitions[categoryId];
    if (!category) return {};

    const [fromId, toId] = conversion.split('-to-');
    const fromUnit = category.units.find(u => u.id === fromId);
    const toUnit = category.units.find(u => u.id === toId);

    if (!fromUnit || !toUnit) return {};

    return {
        title: `Convert ${fromUnit.name} to ${toUnit.name} (${fromUnit.symbol} to ${toUnit.symbol}) - Fast & Accurate`,
        description: `Instant free online tool for ${fromUnit.name} to ${toUnit.name} conversion. Learn the formula and convert values between ${fromUnit.name}s and ${toUnit.name}s.`,
    };
}

import { richConversionContent } from '@/lib/content/conversions';

export default async function ConversionPage({ params }: PageProps) {
    const { category: categoryIdParam, conversion } = await params;
    const categoryId = categoryIdParam as UnitCategory;
    const category = unitDefinitions[categoryId];

    if (!category) notFound();

    const [fromId, toId] = conversion.split('-to-');
    const fromUnit = category.units.find(u => u.id === fromId);
    const toUnit = category.units.find(u => u.id === toId);

    if (!fromUnit || !toUnit) notFound();

    // Check for Rich Content
    const contentKey = `${categoryId}/${conversion}`;
    const richContent = richConversionContent[contentKey];


    return (
        <div className="container mx-auto px-4 py-12 max-w-screen-xl">
            {/* Navigation Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <Link
                    href={`/${categoryId}`}
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                >
                    <div className="p-2 rounded-full bg-secondary group-hover:bg-primary/10 mr-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Back to {category.name} Converter
                </Link>

                <nav className="text-sm text-muted-foreground hidden md:block">
                    <ul className="flex items-center space-x-2">
                        <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li className="text-border">/</li>
                        <li><Link href={`/${categoryId}`} className="hover:text-primary transition-colors">{category.name}</Link></li>
                        <li className="text-border">/</li>
                        <li className="text-foreground font-medium truncate max-w-[200px]">{fromUnit.name} to {toUnit.name}</li>
                    </ul>
                </nav>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {richContent?.title || `Convert ${fromUnit.name} to ${toUnit.name}`}
                </h1>
                <p className="text-muted-foreground text-lg text-pretty max-w-2xl mx-auto">
                    {richContent ? richContent.intro : `Transform ${fromUnit.name}s into ${toUnit.name}s with engineering-grade precision.`}
                </p>
            </div>

            <div className="mb-8">
                <AdUnit className="max-w-3xl mx-auto" slotId="header-slot" />
            </div>

            <div className="mb-16">
                <ConverterWidget
                    category={categoryId}
                    initialFrom={fromUnit.id}
                    initialTo={toUnit.id}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div className="prose prose-neutral dark:prose-invert">
                    {/* Dynamic Content Section */}
                    {richContent ? (
                        <>
                            <h3>Why Converts {fromUnit.symbol} to {toUnit.symbol}?</h3>
                            <p>{richContent.intro}</p>

                            {richContent.benefits && (
                                <>
                                    <h4>Key Benefits</h4>
                                    <ul>
                                        {richContent.benefits.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {richContent.faq && (
                                <>
                                    <h3>Common Questions</h3>
                                    {richContent.faq.map((item, i) => (
                                        <div key={i} className="mb-4">
                                            <h4 className="text-base font-bold mb-1">{item.question}</h4>
                                            <p className="text-sm text-muted-foreground m-0">{item.answer}</p>
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    ) : (
                        // Fallback Generic Content
                        <>
                            <h3>How to convert {fromUnit.symbol} to {toUnit.symbol}</h3>
                            <p>
                                To convert a value from {fromUnit.name} to {toUnit.name}, you need to know the ratio between these two units.
                                Our tool performs this calculation automatically using high-precision arithmetic.
                            </p>
                        </>
                    )}

                    {/* Formula Box (Always Show) */}
                    <div className="bg-secondary/50 p-4 rounded-lg border border-border not-prose mt-6">
                        <p className="font-mono text-sm text-center">
                            1 {fromUnit.name} ≈ {(fromUnit.ratio / toUnit.ratio).toFixed(6)} {toUnit.name}
                        </p>
                    </div>
                </div>

                <div className="prose prose-neutral dark:prose-invert">
                    <h3>Quick Conversion Table</h3>
                    <div className="not-prose rounded-lg border border-border overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-secondary text-secondary-foreground font-medium">
                                <tr>
                                    <th className="px-4 py-3">{fromUnit.symbol}</th>
                                    <th className="px-4 py-3">{toUnit.symbol}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[1, 5, 10, 20, 50, 100].map((val) => (
                                    <tr key={val} className="bg-card">
                                        <td className="px-4 py-2">{val}</td>
                                        <td className="px-4 py-2">{(val * (fromUnit.ratio / toUnit.ratio)).toFixed(4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="mt-12 mb-8">
                <h3 className="text-xl font-bold mb-6 text-center">More {fromUnit.symbol} Conversions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {category.units.filter(u => u.id !== fromUnit.id && u.id !== toUnit.id).slice(0, 8).map(u => (
                        <Link
                            key={u.id}
                            href={`/${categoryId}/${fromUnit.id}-to-${u.id}`}
                            className="text-sm p-3 bg-card border border-border rounded-lg text-center hover:bg-primary/5 hover:border-primary/50 transition-colors"
                        >
                            {fromUnit.name} to {u.name}
                        </Link>
                    ))}
                </div>
            </div>


            <div className="mt-16 mb-8">
                <AdUnit className="max-w-3xl mx-auto" slotId="footer-slot" />
            </div>

            <JsonLdBreadcrumb
                crumbs={[
                    { name: 'Home', path: '/' },
                    { name: category.name, path: `/${categoryId}` },
                    { name: `${fromUnit.name} to ${toUnit.name}`, path: `/${categoryId}/${fromUnit.id}-to-${toUnit.id}` }
                ]}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: `Convert ${fromUnit.name} to ${toUnit.name}`,
                        description: `Free online tool to convert ${fromUnit.name} to ${toUnit.name}.`,
                        applicationCategory: 'UtilityApplication',
                        operatingSystem: 'Any',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                        featureList: `Convert ${fromUnit.symbol} to ${toUnit.symbol}, High Precision, Instant Results`,
                    }),
                }}
            />
        </div>
    );
}
