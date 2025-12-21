
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ProtectPdfClient from './client';
import { Lock, Shield, Key } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Protect PDF with Password - Encrypt PDF Online | UnitMaster',
    description: 'Securely add a password to your PDF files. Encrypt documents with 256-bit AES protection. 100% client-side privacy.',
    keywords: ['protect pdf', 'encrypt pdf', 'add password to pdf', 'lock pdf', 'secure pdf', 'pdf security'],
    alternates: {
        canonical: 'https://unitmaster.io/tools/pdf/protect',
    },
    openGraph: {
        title: 'Protect PDF - Encrypt & Lock PDF Files Online',
        description: 'Add strong password protection to your PDFs instantly in the browser.',
        url: 'https://unitmaster.io/tools/pdf/protect',
        type: 'website',
    },
};

export default async function ProtectPdfPage() {
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

    // Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster Protect PDF',
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Tool to encrypt and password-protect PDF documents locally in the browser.',
        featureList: 'AES Encryption, Password Protection, Client-side privacy',
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-screen-xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="space-y-12">
                <div className="container mx-auto px-4 max-w-4xl pt-8 text-center space-y-4">
                    <h1 className="text-3xl font-bold">Protect PDF File</h1>
                    <p className="text-muted-foreground">Encrypt your PDF with a strong password. Private, secure, and processing happens entirely on your device.</p>
                </div>

                <ProtectPdfClient isPro={isPro} />

                {/* Content / SEO Section */}
                <div className="container mx-auto px-4 max-w-5xl mt-24 mb-12">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Strong Encryption</h3>
                            <p className="text-muted-foreground">
                                We use industry-standard AES encryption (128-bit or 256-bit) to ensure your document remains unhackable.
                            </p>
                        </div>

                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-6">
                                <Lock className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Password Protected</h3>
                            <p className="text-muted-foreground">
                                Set a custom password that will be required to open, print, or copy content from the file.
                            </p>
                        </div>

                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-6">
                                <Key className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">You Hold the Key</h3>
                            <p className="text-muted-foreground">
                                Since processing is 100% offline, we never see your password or your file. You are in total control.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-2xl p-2 shadow-sm">
                        <AccordionItem value="item-1" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                How secure is this encryption?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                Very secure. We use standard AES encryption, which is the same standard used by banks and governments. Without the password, the file content is practically impossible to read.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Can you recover my password if I forget it?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                No. Because we do not store your file or your password, if you forget the password, the file cannot be recovered by us.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b-0 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Is this free?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                Yes, basic protection is free. Power users can upgrade to Pro for batch processing and advanced permission settings (like preventing printing).
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
