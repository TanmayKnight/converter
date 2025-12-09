import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";

interface AffiliateCardProps {
    title: string;
    description: string;
    ctaText: string;
    href: string;
    imagePath?: string;
    badge?: string;
}

export function AffiliateCard({ title, description, ctaText, href, badge }: AffiliateCardProps) {
    return (
        <div className="bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                {badge || "Sponsored"}
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Star className="w-6 h-6 text-primary fill-primary/20" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-tight">{title}</h3>
                        <div className="flex text-yellow-500 text-xs mt-1">
                            ★★★★★
                        </div>
                    </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {description}
                </p>

                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40"
                >
                    {ctaText}
                    <ExternalLink className="w-4 h-4 ml-1" />
                </a>

                <p className="text-[10px] text-muted-foreground/50 text-center mt-3">
                    Ad • We may earn a commission from this link
                </p>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
        </div>
    );
}
