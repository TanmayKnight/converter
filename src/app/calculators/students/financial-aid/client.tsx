'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Plus, Trash2, DollarSign, Calculator, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AidItem {
    id: string;
    name: string;
    amount: number;
    type: 'grant' | 'scholarship' | 'loan' | 'work-study';
}

export function FinancialAidCalculator() {
    // Costs
    const [tuition, setTuition] = useState<number>(25000);
    const [roomBoard, setRoomBoard] = useState<number>(12000);
    const [books, setBooks] = useState<number>(1200);
    const [otherExpenses, setOtherExpenses] = useState<number>(2000);

    // Contribution
    const [familyContribution, setFamilyContribution] = useState<number>(5000);

    // Aid
    const [aidItems, setAidItems] = useState<AidItem[]>([
        { id: '1', name: 'Federal Pell Grant', amount: 3000, type: 'grant' },
        { id: '2', name: 'University Scholarship', amount: 5000, type: 'scholarship' },
        { id: '3', name: 'Federal Direct Loan', amount: 5500, type: 'loan' },
    ]);

    const [newAidName, setNewAidName] = useState('');
    const [newAidAmount, setNewAidAmount] = useState('');
    const [newAidType, setNewAidType] = useState<AidItem['type']>('grant');

    // Results
    const [totalCost, setTotalCost] = useState(0);
    const [totalAid, setTotalAid] = useState(0);
    const [navLink, setNavLink] = useState(0); // Typo catch? No, logic.
    const [netPrice, setNetPrice] = useState(0);
    const [unmetNeed, setUnmetNeed] = useState(0);

    useEffect(() => {
        const cost = tuition + roomBoard + books + otherExpenses;
        const aid = aidItems.reduce((sum, item) => sum + item.amount, 0);
        const net = Math.max(0, cost - aid); // Price you pay (including loans if you consider loans as aid)
        // Actually, Net Price is usually Cost - Gift Aid (Grants/Scholarships). Loans are something you pay back.
        // Let's clarifying: "Net Cost to You" typically means what you have to write a check for or cover with loans.
        // Official "Net Price" definition = COA - Gift Aid.

        // Let's calculate: 
        // 1. Total Cost of Attendance (COA)
        // 2. Gift Aid (Grants + Scholarships)
        // 3. Net Price (COA - Gift Aid)
        // 4. Remaining Cost to Pay (Net Price - Loans - Work Study - EFC? No, EFC is what you *should* pay)
        // Let's stick to a breakdown: COA, Aid, Unmet.

        const giftAid = aidItems.filter(i => i.type === 'grant' || i.type === 'scholarship').reduce((s, i) => s + i.amount, 0);
        const loanAid = aidItems.filter(i => i.type === 'loan').reduce((s, i) => s + i.amount, 0);
        const workAid = aidItems.filter(i => i.type === 'work-study').reduce((s, i) => s + i.amount, 0);

        setTotalCost(cost);
        setTotalAid(aid);
        setNetPrice(Math.max(0, cost - giftAid)); // Genuine Net Price
        setUnmetNeed(Math.max(0, cost - aid - familyContribution));
    }, [tuition, roomBoard, books, otherExpenses, aidItems, familyContribution]);

    const addAidItem = () => {
        if (!newAidName || !newAidAmount) return;
        const amount = parseFloat(newAidAmount);
        if (isNaN(amount)) return;

        setAidItems([...aidItems, {
            id: Math.random().toString(36).substr(2, 9),
            name: newAidName,
            amount,
            type: newAidType
        }]);
        setNewAidName('');
        setNewAidAmount('');
    };

    const removeAidItem = (id: string) => {
        setAidItems(aidItems.filter(i => i.id !== id));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">

                {/* Cost of Attendance Section */}
                <div className="md:border md:border-border/50 md:rounded-xl md:p-6 md:bg-card/30">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold">Cost of Attendance</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Tuition & Fees</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="number" value={tuition} onChange={(e) => setTuition(Number(e.target.value))} className="pl-9" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Room & Board</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="number" value={roomBoard} onChange={(e) => setRoomBoard(Number(e.target.value))} className="pl-9" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Books & Supplies</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="number" value={books} onChange={(e) => setBooks(Number(e.target.value))} className="pl-9" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Other Expenses</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="number" value={otherExpenses} onChange={(e) => setOtherExpenses(Number(e.target.value))} className="pl-9" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Aid Section */}
                <div className="md:border md:border-border/50 md:rounded-xl md:p-6 md:bg-card/30">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                            <Plus className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold">Financial Aid & Scholarships</h3>
                    </div>

                    <div className="space-y-4">
                        {aidItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/50">
                                <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-muted-foreground capitalize">{item.type}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-green-600 dark:text-green-400 font-medium">
                                        +${item.amount.toLocaleString()}
                                    </span>
                                    <Button variant="ghost" size="icon" onClick={() => removeAidItem(item.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <div className="grid grid-cols-12 gap-2 items-end pt-2">
                            <div className="col-span-12 md:col-span-5 space-y-1">
                                <Label className="text-xs">Name</Label>
                                <Input placeholder="e.g. Merit Scholarship" value={newAidName} onChange={(e) => setNewAidName(e.target.value)} />
                            </div>
                            <div className="col-span-6 md:col-span-3 space-y-1">
                                <Label className="text-xs">Amount</Label>
                                <Input type="number" placeholder="2000" value={newAidAmount} onChange={(e) => setNewAidAmount(e.target.value)} />
                            </div>
                            <div className="col-span-6 md:col-span-3 space-y-1">
                                <Label className="text-xs">Type</Label>
                                <Select value={newAidType} onValueChange={(v: any) => setNewAidType(v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="grant">Grant (Gift)</SelectItem>
                                        <SelectItem value="scholarship">Scholarship (Gift)</SelectItem>
                                        <SelectItem value="loan">Loan (Repay)</SelectItem>
                                        <SelectItem value="work-study">Work-Study</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-12 md:col-span-1">
                                <Button onClick={addAidItem} className="w-full" size="icon" disabled={!newAidName || !newAidAmount}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resources / Family Contribution */}
                <div className="md:border md:border-border/50 md:rounded-xl md:p-6 md:bg-card/30">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base font-semibold">Expected Family Contribution</Label>
                                <p className="text-sm text-muted-foreground">What you/your family plan to pay out of pocket.</p>
                            </div>
                        </div>
                        <div className="relative">
                            <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="number"
                                value={familyContribution}
                                onChange={(e) => setFamilyContribution(Number(e.target.value))}
                                className="pl-9 text-lg font-medium"
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="lg:col-span-5 space-y-6">
                <div className="sticky top-24 space-y-6">

                    {/* Main Result Card */}
                    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6 space-y-6">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Total Cost of Attendance</p>
                                <div className="text-3xl font-bold tracking-tight">${totalCost.toLocaleString()}</div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-border/50">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Total Aid (All Types)</span>
                                    <span className="font-medium text-green-600 dark:text-green-400">-${totalAid.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Family Contribution</span>
                                    <span className="font-medium">-${familyContribution.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border bg-muted/20 -mx-6 -mb-6 p-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-semibold text-lg">Remaining Need</span>
                                    <span className={cn("text-2xl font-bold", unmetNeed > 0 ? "text-destructive" : "text-green-600")}>
                                        ${unmetNeed.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {unmetNeed > 0
                                        ? "This is the 'gap' you still need to cover through additional loans, savings, or work."
                                        : "Great! Your aid and contribution cover the full cost."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold mb-4">Cost Breakdown</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                    <span>Tuition & Fees</span>
                                </div>
                                <span className="font-mono">${tuition.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary/70" />
                                    <span>Room & Board</span>
                                </div>
                                <span className="font-mono">${roomBoard.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary/40" />
                                    <span>Books & Other</span>
                                </div>
                                <span className="font-mono">${(books + otherExpenses).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Net Price metric */}
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl p-4 flex items-start gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-700 dark:text-blue-400">
                            <RefreshCcw className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="font-medium text-blue-900 dark:text-blue-200 text-sm">Net Price</h4>
                            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 my-1">
                                ${netPrice.toLocaleString()}
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                                Total Cost minus Grants & Scholarships. This is the true "sticker price" before loans.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
