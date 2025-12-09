'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { UnitDefinition } from '@/lib/units/definitions';

interface UnitSelectProps {
    value: string;
    units: UnitDefinition[];
    onChange: (value: string) => void;
    className?: string;
    align?: 'left' | 'right';
}

export function UnitSelect({ value, units, onChange, className = '', align = 'left' }: UnitSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search when opening
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
        if (!isOpen) {
            setSearch(''); // Clear search on close
        }
    }, [isOpen]);

    const selectedUnit = units.find(u => u.id === value);

    const filteredUnits = useMemo(() => {
        const s = search.toLowerCase();
        return units.filter(u =>
            u.name.toLowerCase().includes(s) ||
            u.symbol.toLowerCase().includes(s) ||
            u.id.toLowerCase().includes(s)
        );
    }, [units, search]);

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-transparent text-sm font-semibold text-primary/80 outline-none hover:text-primary transition-colors whitespace-nowrap"
            >
                <span className="truncate max-w-[140px]">
                    {selectedUnit ? `${selectedUnit.name} (${selectedUnit.symbol})` : 'Select Unit'}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={`absolute z-50 mt-2 w-64 bg-card rounded-xl shadow-xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-100 ${align === 'right' ? 'right-0' : 'left-0'}`}
                >
                    {/* Search Header */}
                    <div className="p-2 border-b border-border bg-secondary/30 sticky top-0 backdrop-blur-sm">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search units..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-background/50 border border-border/50 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/50"
                            />
                        </div>
                    </div>

                    {/* List */}
                    <div className="max-h-[250px] overflow-y-auto p-1 custom-scrollbar">
                        {filteredUnits.length === 0 ? (
                            <div className="p-4 text-center text-xs text-muted-foreground">
                                No units found
                            </div>
                        ) : (
                            filteredUnits.map((u) => (
                                <button
                                    key={u.id}
                                    onClick={() => {
                                        onChange(u.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${u.id === value ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-secondary'}`}
                                >
                                    <span className="truncate mr-2">{u.name}</span>
                                    <span className="text-xs text-muted-foreground shrink-0 w-8 text-right">{u.symbol}</span>
                                    {u.id === value && <Check className="h-3 w-3 ml-1 shrink-0" />}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
