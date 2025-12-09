import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface CompactCardProps {
    href: string;
    icon: LucideIcon;
    title: string;
    description: string;
    colorClass?: string;
    iconColorClass?: string;
}

export function CompactCard({ href, icon: Icon, title, description, colorClass = "border-border", iconColorClass = "text-primary" }: CompactCardProps) {
    return (
        <Link
            href={href}
            className={`group relative overflow-hidden rounded-lg border ${colorClass} bg-card p-3 hover:shadow-sm hover:border-primary/40 transition-all duration-200 flex items-center gap-3 h-full`}
        >
            <div className={`p-1.5 rounded-md bg-secondary/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 shrink-0 ${iconColorClass}`}>
                <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{title}</h3>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                </div>
            </div>
        </Link>
    );
}
