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
        <div className="space-y-12">
            <RemoveBackgroundClient />

            <div className="container mx-auto px-4 max-w-4xl space-y-16 py-12">
                {/* How It Works */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-center">AI Background Removal in Seconds</h2>
                    <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                        Say goodbye to complex Photoshop lassos. Our AI automatically detects the subject of your photo and cuts it out with surgical precision.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 text-center mt-8">
                        <div className="p-6 bg-card rounded-2xl border border-border">
                            <h3 className="font-bold text-xl mb-2">1. Upload Image</h3>
                            <p className="text-sm text-muted-foreground">Select any JPG or PNG image. For best results, choose an image with a clear subject.</p>
                        </div>
                        <div className="p-6 bg-card rounded-2xl border border-border">
                            <h3 className="font-bold text-xl mb-2">2. AI Processing</h3>
                            <p className="text-sm text-muted-foreground">Our local AI model (U-2-Net) identifies the foreground and separates it from the background instantly.</p>
                        </div>
                        <div className="p-6 bg-card rounded-2xl border border-border">
                            <h3 className="font-bold text-xl mb-2">3. Download PNG</h3>
                            <p className="text-sm text-muted-foreground">Get a high-quality transparent PNG ready for your marketing materials or e-commerce store.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-secondary/10 p-8 rounded-3xl border border-border/50 prose prose-neutral dark:prose-invert max-w-none">
                    <h3>Why use a Transparent Background?</h3>
                    <p>
                        In e-commerce, product photography is king. A cluttered background distracts customers. By removing the background and replacing it with pure white (or a branded color), you can increase conversion rates significantly.
                    </p>
                    <p>
                        <strong>UnitMaster Difference:</strong> Most free tools reduce the image quality or add watermarks. We do neither. Because we run the AI model on <em>your</em> computer, we don't have server costs to cover, allowing us to offer unlimited, high-quality removal for free.
                    </p>
                </div>

                {/* FAQ */}
                <div className="border-t border-border pt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Common Questions</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <h3 className="font-semibold">Is it really free?</h3>
                            <p className="text-sm text-muted-foreground">Yes. Standard resolution downloads are 100% free and unlimited. We offer a Pro plan for batch processing and HD quality.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">What is the best image format to use?</h3>
                            <p className="text-sm text-muted-foreground">JPGs usually work best for the source image. The result will always be a PNG, as JPGs do not support transparency.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Does it work on hair/fur?</h3>
                            <p className="text-sm text-muted-foreground">Our AI is trained to handle complex edges like hair, but for extremely messy backgrounds, the results may vary. High contrast between subject and background yields the best results.</p>
                        </div>
                    </div>
                </div>
            </div>


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
        </div>
    );
}
