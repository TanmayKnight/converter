import Link from 'next/link';
import { Menu, X, Calculator } from 'lucide-react';
import { Search } from './Search';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Calculator className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        UnitMaster
                    </span>
                </Link>

                <div className="flex-1 max-w-md mx-4 hidden md:block">
                    <Search />
                </div>

                <div className="md:hidden">
                    <Search />
                </div>

            </div>
        </nav>
    );
}
