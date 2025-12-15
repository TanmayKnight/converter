import React from 'react';
import { ExternalLink, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface BankOfferItem {
    id: string;
    bankName: string;
    description: string;
    rateHighlight: string; // e.g., "Rates from 5.99%"
    ctaText: string;
    affiliateLink: string;
    logoUrl?: string; // Optional: In a real app, you'd use bank logos
    featured?: boolean;
}

interface BankOfferListProps {
    title: string;
    subtitle?: string;
    offers: BankOfferItem[];
}

export function BankOfferList({ title, subtitle, offers }: BankOfferListProps) {
    return (
        <div className="w-full mt-8 border-t border-border pt-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
                        <TrendingDown className="h-5 w-5" />
                        {title}
                    </h3>
                    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/30 px-2 py-1 rounded">
                    Sponsored
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className={`
                            relative flex flex-col justify-between p-4 rounded-lg border transition-all hover:shadow-sm
                            ${offer.featured
                                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                                : 'bg-card border-border/50 hover:border-emerald-500/30'}
                        `}
                    >
                        {offer.featured && (
                            <div className="absolute -top-2.5 left-3">
                                <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Editor's Choice
                                </span>
                            </div>
                        )}

                        <div>
                            <h4 className="font-bold text-base mb-1">{offer.bankName}</h4>
                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                {offer.rateHighlight}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{offer.description}</p>
                        </div>

                        <Button asChild size="sm" className={`w-full h-8 text-xs ${offer.featured ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}>
                            <a href={offer.affiliateLink} target="_blank" rel="noopener noreferrer nofollow">
                                {offer.ctaText} <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                        </Button>
                    </div>
                ))}
            </div>

            <p className="text-right text-[10px] text-muted-foreground mt-4 opacity-50">
                UnitMaster may receive compensation from partners.
            </p>
        </div>
    );
}
