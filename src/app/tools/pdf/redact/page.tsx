
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import RedactPdfClient from './client';
import { FileText, Shield, Key, EyeOff, Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Redact PDF Online - Permanently Remove Sensitive Text | UnitMaster',
    description: 'Securely blackout and permanently remove sensitive information from PDF documents. 100% client-side sanitization. No server uploads.',
    keywords: ['redact pdf', 'blackout pdf text', 'remove pdf text', 'pdf sanitizer', 'hide pdf info'],
    alternates: {
        canonical: 'https://unitmaster.io/tools/pdf/redact',
    },
    openGraph: {
        title: 'Redact PDF Online - Permanently Remove Text',
        description: 'Securely blackout sensitive information from PDFs permanently. 100% Client-side.',
        url: 'https://unitmaster.io/tools/pdf/redact',
        type: 'website',
    },
};

export default async function RedactPdfPage() {
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

    // Structured Data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster Secure Redact',
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Tool to permanently redact and sanitize PDF documents in the browser.',
        featureList: 'Permanent redaction, PDF flattening, Client-side privacy',
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-screen-xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="space-y-12">
                <div className="container mx-auto px-4 max-w-4xl pt-8 text-center space-y-4">
                    <h1 className="text-3xl font-bold">Redact PDF Permanently</h1>
                    <p className="text-muted-foreground">Securely blackout sensitive text. We flatten the document to ensure data is irretrievable.</p>
                </div>

                <RedactPdfClient isPro={isPro} />

                {/* Content / SEO Section */}
                <div className="container mx-auto px-4 max-w-5xl mt-24 mb-12">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-6">
                                <EyeOff className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Permanent Removal</h3>
                            <p className="text-muted-foreground">
                                We don't just draw a black box. We rasterize the area to ensure the underlying text is completely destroyed.
                            </p>
                        </div>

                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Legal & Safe</h3>
                            <p className="text-muted-foreground">
                                Perfect for lawyers, real estate agents, and HR professionals handling SSNs, addresses, and financial data.
                            </p>
                        </div>

                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Browser-Only</h3>
                            <p className="text-muted-foreground">
                                Your sensitive files never upload to any server. Redaction happens locally using your CPU.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-2xl p-2 shadow-sm">
                        <AccordionItem value="item-1" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Is the text truly gone or just hidden?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                It is truly gone. UnitMaster uses a "flattening" process that converts the redacted page into a secure image, making it impossible for anyone to "unhide" or "select" the text underneath the black box.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Is it suitable for legal documents?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                Yes. Since the data is permanently destroyed, the resulting PDF is safe for sharing in legal or compliance contexts involving PII (Personally Identifiable Information).
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b-0 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Does it work on scanned PDFs?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                Yes, our redaction tool works on both digital PDFs (text-based) and scanned PDFs (image-based) effectively.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
