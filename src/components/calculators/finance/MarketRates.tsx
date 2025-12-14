import { getCurrentMortgageRate } from '@/lib/finance/rates';
import { TrendingUp, Info } from 'lucide-react';

export async function MarketRates() {
    const rate = await getCurrentMortgageRate();
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center justify-between text-sm mb-6">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-500/20 rounded-md">
                    <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                    <span className="font-semibold text-emerald-900 dark:text-emerald-200">Current national avg:</span>
                    <span className="ml-2 font-bold text-emerald-600 dark:text-emerald-400 text-lg">{rate}%</span>
                </div>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 hidden sm:flex">
                <Info className="h-3 w-3" />
                <span>Source: FRED • {date}</span>
            </div>
        </div>
    );
}
