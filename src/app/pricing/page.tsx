import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/server';
import { CheckoutButton } from '@/components/monetization/CheckoutButton';

export const metadata = {
    title: 'Pricing - Upgrade to Pro | UnitMaster',
    description: 'Unlock batch processing, ad-free experience, and priority support with UnitMaster Pro.',
};

export default async function PricingPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="container mx-auto px-4 py-24 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Choose the plan that fits your needs. All core tools are free forever.
                    Upgrade for power features.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Free Plan */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm flex flex-col relative">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <span className="text-6xl font-bold">0</span>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-2">Free Starter</h3>
                        <p className="text-muted-foreground">Perfect for occasional tasks</p>
                        <div className="mt-6 flex items-baseline gap-1">
                            <span className="text-4xl font-bold">$0</span>
                            <span className="text-muted-foreground">/mo</span>
                        </div>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3">
                            <div className="bg-primary/10 p-1 rounded-full"><Check className="h-4 w-4 text-primary" /></div>
                            <span>Access to all 50+ tools</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="bg-primary/10 p-1 rounded-full"><Check className="h-4 w-4 text-primary" /></div>
                            <span>Unlimited single file processing</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="bg-primary/10 p-1 rounded-full"><Check className="h-4 w-4 text-primary" /></div>
                            <span>Local & Private (Client-side)</span>
                        </li>
                        <li className="flex items-center gap-3 text-muted-foreground/50">
                            <div className="bg-muted p-1 rounded-full"><X className="h-4 w-4" /></div>
                            <span>Batch processing</span>
                        </li>
                        <li className="flex items-center gap-3 text-muted-foreground/50">
                            <div className="bg-muted p-1 rounded-full"><X className="h-4 w-4" /></div>
                            <span>Ad-free experience</span>
                        </li>
                    </ul>

                    <Button asChild variant="outline" className="w-full h-12 text-lg">
                        <Link href="/tools/pdf/merge">Use Free Tools</Link>
                    </Button>
                </div>

                {/* Pro Plan */}
                <div className="bg-primary/5 border-2 border-primary rounded-2xl p-8 shadow-xl flex flex-col relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground hover:bg-primary px-3 py-1">MOST POPULAR</Badge>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-2 text-primary">Pro Power</h3>
                        <p className="text-primary/80">For power users & pros</p>
                        <div className="mt-6 flex items-baseline gap-1">
                            <span className="text-4xl font-bold">$4.99</span>
                            <span className="text-muted-foreground">/mo</span>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                            <Badge variant="secondary" className="w-fit bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                                SAVE 50%
                            </Badge>
                            <p className="text-xs text-muted-foreground">Billed $59 annually</p>
                        </div>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3">
                            <div className="bg-primary p-1 rounded-full"><Check className="h-4 w-4 text-primary-foreground" /></div>
                            <span className="font-medium">Everything in Free</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="bg-primary p-1 rounded-full"><Check className="h-4 w-4 text-primary-foreground" /></div>
                            <span className="font-medium">Batch Processing (Unlimited)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="bg-primary p-1 rounded-full"><Check className="h-4 w-4 text-primary-foreground" /></div>
                            <span className="font-medium">Ad-Free Experience</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="bg-primary p-1 rounded-full"><Check className="h-4 w-4 text-primary-foreground" /></div>
                            <span>Priority Server-side Options</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="bg-primary p-1 rounded-full"><Check className="h-4 w-4 text-primary-foreground" /></div>
                            <span>Early access to new AI tools</span>
                        </li>
                    </ul>

                    <CheckoutButton
                        isLoggedIn={!!user}
                        className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                    />
                    <p className="text-xs text-center text-muted-foreground mt-4">
                        14-day money-back guarantee. Cancel anytime.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-24">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-bold mb-2">Do I really need Pro?</h4>
                        <p className="text-muted-foreground">If you only convert one or two files a week, the Free plan is perfect. If you work with hundreds of images or PDFs daily, Pro's Batch Mode will save you hours.</p>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <h4 className="font-bold mb-2">How does the 14-day guarantee work?</h4>
                        <p className="text-muted-foreground">If you're not satisfied with UnitMaster Pro for any reason, email us within 14 days and we'll refund you in full. No questions asked.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
