import type { Metadata } from 'next';
import RemoveBackgroundClient from './client';

export const metadata: Metadata = {
    title: 'Remove Image Background - Free & Unlimited | UnitMaster',
    description: 'Instantly remove backgrounds from images using local technology. Free, unlimited, and runs 100% on your device for maximum privacy.',
    keywords: ['remove background', 'background remover', 'transparent background', 'free image tools'],
    alternates: {
        canonical: 'https://unitmaster.io/tools/image/remove-bg',
    },
    openGraph: {
        title: 'Remove Image Background (Free Tool)',
        description: 'Automatic background removal. Runs locally in your browser.',
        url: 'https://unitmaster.io/tools/image/remove-bg',
        type: 'website',
    },
};

export default function RemoveBackgroundPage() {
    return (
        <>
            <RemoveBackgroundClient />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'UnitMaster Background Remover',
                        applicationCategory: 'MultimediaApplication',
                        operatingSystem: 'Any',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD'
                        },
                        featureList: 'Automatic Background Removal, Local Processing, Unlimited Usage',
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
                                name: 'Is this background remover free?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, UnitMaster Background Remover is 100% free and unlimited because it runs locally on your device using your own processor.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: ' Are my photos uploaded to a server?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No. The processing model (U-2-Net) runs entirely within your browser via WebAssembly. Your photos never leave your computer.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How do I download a transparent PNG?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'After the tool removes the background, simply click the "Download PNG" button. The resulting image will have an alpha channel (transparency) ready for use in any design tool.'
                                }
                            }
                        ]
                    }),
                }}
            />
        </>
    );
}
