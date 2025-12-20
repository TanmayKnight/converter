
import { Metadata } from 'next';
import { SignPdfClient } from './client';

export const metadata: Metadata = {
    title: 'Sign PDF Online - Free Electronic Signature Tool | UnitMaster',
    description: 'Sign PDF documents online for free. Draw, type, or upload your signature. Secure client-side processing, no file uploads required.',
    keywords: ['sign pdf', 'esignature', 'electronic signature', 'sign pdf online', 'pdf signer', 'free pdf signer'],
    alternates: {
        canonical: 'https://unitmaster.io/tools/pdf/sign',
    },
    openGraph: {
        title: 'Sign PDF Online (Free eSignature)',
        description: 'Sign PDF documents safely in your browser. No uploads required.',
        url: 'https://unitmaster.io/tools/pdf/sign',
        type: 'website',
    },
};

import { createClient } from '@/lib/supabase/server';

export default async function SignPdfPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let isPro = false;
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('is_pro')
            .eq('id', user.id)
            .single();
        isPro = !!profile?.is_pro;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-screen-xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Sign PDF Document
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Securely sign your PDF documents directly in the browser. No uploads, no waiting.
                </p>
            </div>
            <SignPdfClient isPro={isPro} />

            {/* Content / SEO Section */}
            <div className="container mx-auto px-4 max-w-4xl space-y-16 py-12">
                <div className="prose prose-neutral dark:prose-invert max-w-none bg-secondary/10 p-8 rounded-2xl border border-border/50">
                    <h2>Sign PDF Documents Online</h2>
                    <p>
                        Printing, signing, and scanning documents is a thing of the past.
                        <strong>UnitMaster eSignature</strong> provides a seamless, secure, and free way to sign your contracts, agreements, and forms directly in your browser.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-lg">Is it safe to sign PDFs online?</h4>
                            <p className="text-muted-foreground mt-2">
                                Yes. Our eSignature tool processes your files <strong>100% locally in your browser</strong>.
                                Your confidential documents are never uploaded to a server, ensuring maximum privacy and security.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg">Can I create a digital signature for free?</h4>
                            <p className="text-muted-foreground mt-2">
                                Absolutely. You can <strong>Draw</strong> your signature with a mouse or touchpad, <strong>Type</strong> it to generate a cursive signature, or <strong>Upload</strong> an image.
                                There are no hidden fees or limits for basic signing.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg">How do I add a date to my signature?</h4>
                            <p className="text-muted-foreground mt-2">
                                Simply click the <strong>Date</strong> button in the toolbar. It will automatically generate a stamp with today's date that you can place anywhere on the document.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">More Information</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <h3 className="font-semibold">Supported Formats</h3>
                            <p className="text-sm text-muted-foreground">We support all standard PDF documents. You can sign contracts, invoices, lease agreements, and more.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Device Compatibility</h3>
                            <p className="text-sm text-muted-foreground">UnitMaster works on Mac, Windows, Linux, and even mobile device browsers.</p>
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
                        name: 'UnitMaster eSignature',
                        applicationCategory: 'BusinessApplication',
                        operatingSystem: 'Any',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD'
                        },
                        featureList: 'Electronic signature, PDF drawing, secure client-side processing',
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
                                name: 'Is it safe to sign PDFs online?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. Our eSignature tool processes your files 100% locally in your browser. Your documents are never uploaded to a server.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Can I create a digital signature for free?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Absolutely. You can draw, type, or upload your signature for free.'
                                }
                            },
                        ]
                    }),
                }}
            />
        </div>
    );
}
