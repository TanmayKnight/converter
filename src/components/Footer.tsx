import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-screen-2xl mx-auto px-4">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} UnitMaster. All rights reserved.
                </p>
                <div className="flex items-center space-x-4">
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">Privacy Policy</Link>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:underline">Terms</Link>
                </div>
            </div>
        </footer>
    );
}
