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

        // Check for calculators
        const calculatorMap: Record<string, string> = {
            'mortgage': '/calculators/finance/mortgage',
            'loan': '/calculators/finance/loan',
            'roi': '/calculators/finance/roi',
            'bmi': '/calculators/health/bmi',
            'finance': '/calculators/finance/mortgage',
            'health': '/calculators/health/bmi',
            'binary': '/calculators/math/base',
            'hex': '/calculators/math/base',
            'decimal': '/calculators/math/base',
            'base': '/calculators/math/base',
            'roman': '/calculators/math/roman',
            'ascii': '/calculators/math/ascii',
            'text': '/calculators/math/ascii',
            'words': '/calculators/math/words',
            'number': '/calculators/math/words',
            'px': '/calculators/technology/px-to-rem',
            'rem': '/calculators/technology/px-to-rem',
            'ohm': '/calculators/physics/ohms-law',
            'voltage': '/calculators/physics/ohms-law',
            'force': '/calculators/physics/force-mass',
            'mass': '/calculators/physics/force-mass',
            'area': '/calculators/geometry/area',
            'triangle': '/calculators/geometry/area',
            'circle': '/calculators/geometry/area',
            'square': '/calculators/geometry/area',
            'volume': '/calculators/geometry/volume',
            'cube': '/calculators/geometry/volume',
            'cylinder': '/calculators/geometry/volume',
            'sphere': '/calculators/geometry/volume',
            'tip': '/calculators/math/tip',
            'percentage': '/calculators/math/percentage',
            'discount': '/calculators/math/percentage',
            'trigonometry': '/calculators/math/trigonometry',
            'sin': '/calculators/math/trigonometry',
            'cos': '/calculators/math/trigonometry',
            'tan': '/calculators/math/trigonometry',
            'statistics': '/calculators/math/statistics',
            'permutation': '/calculators/math/statistics',
            'combination': '/calculators/math/statistics',
            'probability': '/calculators/math/statistics',
            'factorial': '/calculators/math/statistics',
            'algebra': '/calculators/math/algebra',
            'sqrt': '/calculators/math/algebra',
            'root': '/calculators/math/algebra',
            'exponent': '/calculators/math/algebra',
            'log': '/calculators/math/algebra',
            'antilog': '/calculators/math/algebra',
            'investment': '/calculators/finance/investment',
            'simple interest': '/calculators/finance/investment',
            'compound interest': '/calculators/finance/investment',
            'depreciation': '/calculators/finance/investment',
            'npv': '/calculators/finance/investment',
            'tax': '/calculators/finance/tax',
            'gst': '/calculators/finance/tax',
            'vat': '/calculators/finance/tax',
            'retirement': '/calculators/finance/retirement',
            'sip': '/calculators/finance/retirement',
            'goal': '/calculators/finance/retirement',
            'auto loan': '/calculators/finance/loan-advanced',
            'car loan': '/calculators/finance/loan-advanced',
            'payday': '/calculators/finance/loan-advanced',
            'personal loan': '/calculators/finance/loan-advanced'
        };

        for (const [key, path] of Object.entries(calculatorMap)) {
            if (searchTerm.includes(key)) {
                router.push(path);
                return;
            }
        }

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
        <div className="relative group w-full">
            <form onSubmit={handleSearch} className="relative flex items-center">
                <div className="absolute left-3 text-muted-foreground pointer-events-none">
                    <SearchIcon className="h-4 w-4" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-secondary/50 hover:bg-secondary/80 focus:bg-background border border-transparent focus:border-primary/20 text-sm rounded-full pl-10 pr-12 py-2 transition-all outline-none placeholder:text-muted-foreground/70"
                />
                <button type="submit" className="absolute right-1 top-1 bottom-1 bg-background hover:bg-primary hover:text-primary-foreground text-xs font-semibold px-3 rounded-full transition-colors shadow-sm border border-border/50">
                    Go
                </button>
            </form>
        </div>
    );
}
