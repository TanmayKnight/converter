import { useEffect, useState } from 'react';
import { CategoryDefinition, unitDefinitions } from '@/lib/units/definitions';

interface ExchangeRateResponse {
    result: string;
    base_code: string;
    rates: Record<string, number>;
}

export function useCurrencyRates() {
    const [currencyDefinition, setCurrencyDefinition] = useState<CategoryDefinition>(unitDefinitions.currency);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            setIsLoading(true);
            try {
                // Fetch rates with USD base
                const response = await fetch('https://open.er-api.com/v6/latest/USD');
                if (!response.ok) throw new Error('Failed to fetch rates');

                const data: ExchangeRateResponse = await response.json();

                if (data.rates) {
                    const currencyNames = new Intl.DisplayNames(['en'], { type: 'currency' });

                    const allUnits = Object.entries(data.rates).map(([code, rate]) => {
                        let name = code;
                        try {
                            name = currencyNames.of(code) || code;
                        } catch (e) {
                            // Fallback if code is invalid
                        }

                        // API returns "1 USD = X Unit" => we need "1 Unit = 1/X USD"
                        const ratio = 1 / (rate as number);

                        return {
                            id: code,
                            name: `${name}`,
                            symbol: getSymbol(code) || code, // Helper to get symbol
                            ratio: ratio
                        };
                    });

                    // Sort: Standard currencies first, then alphabetical
                    const priority = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD', 'CNY'];
                    allUnits.sort((a, b) => {
                        const idxA = priority.indexOf(a.id);
                        const idxB = priority.indexOf(b.id);
                        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                        if (idxA !== -1) return -1;
                        if (idxB !== -1) return 1;
                        return a.name.localeCompare(b.name);
                    });

                    setCurrencyDefinition({
                        ...unitDefinitions.currency,
                        units: allUnits
                    });
                }
            } catch (err) {
                console.error('Currency fetch error:', err);
                setError('Failed to load live rates. Using cached values.');
                // Fallback to static values is automatic since we initialized with them
            } finally {
                setIsLoading(false);
            }
        };

        fetchRates();
    }, []);

    return { currencyDefinition, isLoading, error };
}

// Simple helper for common symbols, Intl sometimes returns 'US$' or code
function getSymbol(code: string) {
    try {
        return (0).toLocaleString('en-US', { style: 'currency', currency: code, minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/\d/g, '').trim();
    } catch {
        return code;
    }
}
