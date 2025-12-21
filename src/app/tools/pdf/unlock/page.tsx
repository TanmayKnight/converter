
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import UnlockPdfClient from './client';
import { Unlock, ShieldCheck, FileKey } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Unlock PDF - Remove Password from PDF | UnitMaster',
    description: 'Remove passwords and encryption from PDF files. Decrypt documents using your current password to create an unlocked copy. 100% offline.',
    keywords: ['unlock pdf', 'remove pdf password', 'decrypt pdf', 'pdf password remover', 'unlock secure pdf'],
    alternates: {
        canonical: 'https://unitmaster.io/tools/pdf/unlock',
    },
    openGraph: {
        title: 'Unlock PDF - Remove Password Online',
        description: 'Instantly remove passwords from your PDF files in the browser.',
        url: 'https://unitmaster.io/tools/pdf/unlock',
        type: 'website',
    },
};

export default async function UnlockPdfPage() {
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

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'UnitMaster Unlock PDF',
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Tool to legally remove known passwords from PDF documents.',
        featureList: 'PDF Decryption, Password Removal, Local Processing',
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-screen-xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="space-y-12">
                <div className="container mx-auto px-4 max-w-4xl pt-8 text-center space-y-4">
                    <h1 className="text-3xl font-bold">Unlock PDF File</h1>
                    <p className="text-muted-foreground">Remove the password from a secured PDF file. You must know the current password to unlock it.</p>
                </div>

                <UnlockPdfClient isPro={isPro} />

                {/* Content / SEO Section */}
                <div className="container mx-auto px-4 max-w-5xl mt-24 mb-12">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6">
                                <Unlock className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Instant Decryption</h3>
                            <p className="text-muted-foreground">
                                If you have the password, we can instantly strip the encryption layer and give you a standard, open PDF.
                            </p>
                        </div>

                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Keep it Private</h3>
                            <p className="text-muted-foreground">
                                We process the file in your browser's memory. The PDF and the password are never sent to our servers.
                            </p>
                        </div>

                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="h-12 w-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 mb-6">
                                <FileKey className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Owner Access</h3>
                            <p className="text-muted-foreground">
                                Perfect for when you need to print a secured statement or share a file that was locked by your bank.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-2xl p-2 shadow-sm">
                        <AccordionItem value="item-1" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Can you crack a forgotten password?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                No. This tool is designed to remove a password you ALREADY know (e.g., maximizing convenience), not to break into files you don't own.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b-0 mb-2 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Is it legal to remove passwords?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                Generally, yes, if you are the owner of the document or have the right to access it. Removing permissions restrictions (like printing) is a common use case.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b-0 px-2">
                            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 rounded-lg px-4 py-4 text-left font-medium">
                                Are there limits?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                                Free users can unlock up to 3 files per day. Pro users have unlimited access.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
