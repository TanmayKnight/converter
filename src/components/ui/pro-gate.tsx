import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ProGateProps {
    children: React.ReactNode;
    isPro: boolean;
    title?: string;
    description?: string;
    className?: string;
    blurAmount?: 'sm' | 'md' | 'lg';
}

export function ProGate({
    children,
    isPro,
    title = "Pro Feature",
    description = "Upgrade to UnitMaster Pro to unlock this feature.",
    className,
    blurAmount = 'sm'
}: ProGateProps) {
    if (isPro) {
        return <>{children}</>;
    }

    return (
        <div className={cn("relative group overflow-hidden rounded-xl", className)}>
            {/* Blurred Content */}
            <div className={cn(
                "pointer-events-none select-none opacity-50 transition-all duration-300",
                blurAmount === 'sm' && "filter blur-sm",
                blurAmount === 'md' && "filter blur-md",
                blurAmount === 'lg' && "filter blur-lg"
            )}>
                {children}
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] p-6 text-center animate-in fade-in duration-300">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-3 shadow-lg mb-4">
                    <Lock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mb-6">
                    {description}
                </p>
                <Button asChild size="lg" className="rounded-full font-bold shadow-lg shadow-orange-500/20 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-0">
                    <Link href="/pricing">
                        Unlock Pro
                    </Link>
                </Button>
            </div>
        </div>
    );
}
