'use client';

import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { unitDefinitions } from '@/lib/units/definitions';

export function Search() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const searchTerm = query.toLowerCase();

        // 1. Check for specific conversion "X to Y"
        if (searchTerm.includes(' to ')) {
            const [from, to] = searchTerm.split(' to ').map(s => s.trim());
            // Try to find units
            let fromUnitId, toUnitId, categoryId;

            for (const [catName, catDef] of Object.entries(unitDefinitions)) {
                const f = catDef.units.find(u => u.name.toLowerCase() === from || u.symbol.toLowerCase() === from || u.id === from);
                const t = catDef.units.find(u => u.name.toLowerCase() === to || u.symbol.toLowerCase() === to || u.id === to);

                if (f && t) {
                    fromUnitId = f.id;
                    toUnitId = t.id;
                    categoryId = catDef.id;
                    break;
                }
            }

            if (categoryId && fromUnitId && toUnitId) {
                router.push(`/${categoryId}/${fromUnitId}-to-${toUnitId}`);
                return;
            }
        }

        // 2. Check for category search (e.g. "weight")
        const category = Object.values(unitDefinitions).find(
            c => c.name.toLowerCase().includes(searchTerm) || c.id === searchTerm
        );
        if (category) {
            router.push(`/${category.id}`);
            return;
        }

        // 3. Fallback: Check if input matches any unit, go to that category
        for (const [catName, catDef] of Object.entries(unitDefinitions)) {
            if (catDef.units.some(u => u.name.toLowerCase().includes(searchTerm) || u.symbol.toLowerCase() === searchTerm)) {
                router.push(`/${catDef.id}`);
                return;
            }
        }

        // No match found - could show a toast, but for now just clear or do nothing
        // alert("No matching conversion found"); 
    };

    return (
        <div className="mx-auto max-w-md relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <form onSubmit={handleSearch} className="relative bg-background rounded-xl shadow-lg border border-border p-2 flex items-center">
                <SearchIcon className="ml-3 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search (e.g., 'kg to lbs' or 'weight')..."
                    className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground ml-3 h-10 outline-none"
                />
                <button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 h-10 font-medium text-sm transition-all ml-2 cursor-pointer">
                    Go
                </button>
            </form>
        </div>
    );
}
