import { MetadataRoute } from 'next';
import { unitDefinitions } from '@/lib/units/definitions';

// Base URL - In production, this should be the actual domain
const BASE_URL = 'https://unitmaster.io';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    // Add Category Pages
    Object.keys(unitDefinitions).forEach((category) => {
        routes.push({
            url: `${BASE_URL}/${category}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        });
    });

    // Add simplified subset of conversion pages to sitemap (Top 500 to stay within limits/reason)
    // Generating ALL combinations would be massive (e.g. 5000+ pages). 
    // For a real high-SEO site, you'd want many, but maybe split into multiple sitemaps.
    // Here we'll generate the most common ones.

    let count = 0;
    const LIMIT = 500;

    for (const category of Object.values(unitDefinitions)) {
        const units = category.units.slice(0, 5); // Focus on top 5 units per category for sitemap
        for (const fromUnit of units) {
            for (const toUnit of units) {
                if (fromUnit.id !== toUnit.id) {
                    if (count < LIMIT) {
                        routes.push({
                            url: `${BASE_URL}/${category.id}/${fromUnit.id}-to-${toUnit.id}`,
                            lastModified: new Date(),
                            changeFrequency: 'monthly',
                            priority: 0.6,
                        });
                        count++;
                    }
                }
            }
        }
    }

    return routes;
}
