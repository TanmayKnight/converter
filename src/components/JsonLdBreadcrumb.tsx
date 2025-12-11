import React from 'react';

export interface BreadcrumbItem {
    name: string;
    path: string;
}

interface JsonLdBreadcrumbProps {
    crumbs: BreadcrumbItem[];
}

export function JsonLdBreadcrumb({ crumbs }: JsonLdBreadcrumbProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `https://unitmasterapp.com${crumb.path}`,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
