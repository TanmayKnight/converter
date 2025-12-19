import type { Metadata } from 'next';
import MergePDFClient from './client';

export const metadata: Metadata = {
    title: 'Merge PDF Files Online - Free & Secure | UnitMaster',
    description: 'Combine multiple PDFs into one file instantly. Private, client-side processing with no file uploads. Merge unlimited files with Pro.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger', 'free pdf tools', 'secure pdf merge'],
    alternates: {
        canonical: 'https://unitmaster.io/tools/pdf/merge',
    },
    openGraph: {
        title: 'Merge PDF Files (Private & Secure)',
        description: 'Combine PDFs instantly in your browser. No server uploads.',
        url: 'https://unitmaster.io/tools/pdf/merge',
        type: 'website',
    },
};

export default function MergePDFPage() {
    return (
        <>
            <MergePDFClient />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'UnitMaster PDF Merger',
                        applicationCategory: 'UtilitiesApplication',
                        operatingSystem: 'Any',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD'
                        },
                        featureList: 'Merge multiple PDF files, Drag and drop reordering, Client-side processing',
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'Is UnitMaster PDF Merger safe for sensitive documents?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, it is 100% safe. The merging process runs locally in your browser, meaning your files are never uploaded to any server.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: ' Is there a limit to how many PDFs I can merge?',
                                acceptedAnswer: {
                                    text: 'Free users can merge up to 3 files at once. Pro users can merge an unlimited number of PDF files.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do I rearrange the order of my PDFs?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Simply drag and drop the file thumbnails in the list to change their sequence before clicking Merge.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
