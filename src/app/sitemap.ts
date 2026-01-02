import { MetadataRoute } from 'next';
import { unitDefinitions } from '@/lib/units/definitions';
import { getBlogPosts } from '@/lib/blog';

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
        // Blog Index
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        // Core Pages
        { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        // Static Calculator Pages
        { url: `${BASE_URL}/calculators/finance/mortgage`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/finance/loan`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/finance/investment`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/finance/tax`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/finance/retirement`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/finance/roi`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/finance/loan-advanced`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

        { url: `${BASE_URL}/calculators/math/percentage`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/calculators/math/statistics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/calculators/math/algebra`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/calculators/math/trigonometry`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/calculators/math/tip`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/calculators/math/ascii`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/calculators/math/base`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/calculators/math/roman`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/calculators/math/words`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

        { url: `${BASE_URL}/calculators/geometry/area`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/calculators/geometry/volume`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

        { url: `${BASE_URL}/calculators/technology/px-to-rem`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

        { url: `${BASE_URL}/calculators/physics/ohms-law`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/calculators/physics/force-mass`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

        { url: `${BASE_URL}/calculators/health/bmi`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

        // Student Tools (High Value)
        { url: `${BASE_URL}/calculators/students/gpa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/students/scientific`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/students/financial-aid`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/students/grade`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/students/citation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/calculators/students/pomodoro`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

        // PDF Tools (High Value)
        { url: `${BASE_URL}/tools/pdf/merge`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/pdf/split`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/pdf/compress`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/pdf/sign`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/pdf/redact`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/pdf/protect`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/pdf/unlock`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/pdf/pdf-to-image`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/pdf/image-to-pdf`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/pdf/to-word`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

        // Image Tools (High Value)
        { url: `${BASE_URL}/tools/image/crop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/image/remove-bg`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/image/passport`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/image/converter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/image/headshot`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

        // Developer Tools (High Value)
        { url: `${BASE_URL}/tools/dev/json-formatter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/dev/qr-code`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/dev/jwt-debugger`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/dev/base64`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

        // Creator Tools
        { url: `${BASE_URL}/tools/creator/thumbnail`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/creator/trimmer`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/creator/audio-extractor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/creator/voice-changer`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/tools/creator/audio-mixer`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

        { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
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
    const LIMIT = 5000; // Increased to capture all meaningful combinations

    for (const category of Object.values(unitDefinitions)) {
        // Remove slice restriction to allow ALL unit combinations (Programmatic SEO)
        const units = category.units;
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

    // Add Blog Posts
    const blogPosts = getBlogPosts();
    blogPosts.forEach((post) => {
        routes.push({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly',
            priority: 0.8,
        });
    });

    return routes;
}
