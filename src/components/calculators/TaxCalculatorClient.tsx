'use client';

import { useState } from 'react';
import { Download, Receipt, Calculator, Store, BadgeDollarSign, DollarSign, Percent } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorContent } from '@/components/CalculatorContent';
import { toast } from 'sonner';

type Mode = 'exclusive' | 'inclusive';

export function TaxCalculatorClient() {
    // Inputs
    const [price, setPrice] = useState<string>('100');
    const [rate, setRate] = useState<string>('10');
    const [mode, setMode] = useState<Mode>('exclusive');
    const [taxName, setTaxName] = useState<string>('GST/VAT');

    // Derived Results (computed on fly for simplicity in render)
    const p = parseFloat(price) || 0;
    const r = parseFloat(rate) || 0;

    let net = 0;
    let taxAmount = 0;
    let gross = 0;

    if (mode === 'exclusive') {
        // Price is Net, add Tax
        net = p;
        taxAmount = p * (r / 100);
        gross = net + taxAmount;
    } else {
        // Price is Gross, extract Tax
        gross = p;
        // Gross = Net * (1 + r) => Net = Gross / (1 + r)
        net = gross / (1 + (r / 100));
        taxAmount = gross - net;
    }

    const downloadInvoice = () => {
        const doc = new jsPDF();

        doc.setFillColor(30, 41, 59); // Slate-800
        doc.rect(0, 0, 210, 25, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.text('Pro Forma Invoice / Estimate', 14, 15);

        doc.setFontSize(10);
        doc.text('Generated via UnitMaster', 14, 21);

        doc.setTextColor(0, 0, 0);

        const tableData = [
            ['Subtotal (Net Amount)', `$${net.toFixed(2)}`],
            [`${taxName} (${rate}%)`, `$${taxAmount.toFixed(2)}`],
            ['TOTAL', `$${gross.toFixed(2)}`]
        ];

        autoTable(doc, {
            startY: 40,
            head: [['Description', 'Amount']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [30, 41, 59] },
            columnStyles: {
                0: { fontStyle: 'bold' },
                1: { halign: 'right' }
            }
        });

        doc.text("Thank you for your business.", 14, 80);

        doc.save('UnitMaster_Invoice_Estimate.pdf');
        toast.success("Invoice PDF Downloaded");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Tax & Invoice Calculator</h1>
                <p className="text-muted-foreground">Calculate GST, VAT, or Sales Tax and generate invoice estimates.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                    <div className="flex gap-2 bg-secondary p-1 rounded-xl mb-6">
                        <button
                            onClick={() => setMode('exclusive')}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'exclusive' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Add Tax (Exclusive)
                        </button>
                        <button
                            onClick={() => setMode('inclusive')}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'inclusive' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Remove Tax (Inclusive)
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Amount ($)</label>
                            <div className="relative mt-1">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-slate-500/20" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Tax Rate (%)</label>
                            <div className="relative mt-1">
                                <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-slate-500/20" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Tax Name (Optional)</label>
                            <div className="relative mt-1">
                                <BadgeDollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input type="text" value={taxName} onChange={e => setTaxName(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-slate-500/20" placeholder="e.g. GST, VAT" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Receipt Style Result */}
                    <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-8 relative overflow-hidden">
                        {/* Receipt zigzag top effect css can go here but sticking to simple clean design */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 opactiy-50"></div>

                        <div className="flex justify-between items-center mb-6">
                            <div className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Receipt / Estimate</div>
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <Receipt className="h-5 w-5 text-slate-500" />
                            </div>
                        </div>

                        <div className="space-y-4 border-b border-dashed border-border pb-6 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Subtotal (Net)</span>
                                <span className="font-semibold">${net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between items-center text-red-500">
                                <span>{taxName} ({rate}%)</span>
                                <span className="font-semibold">+${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-8">
                            <span className="text-xl font-bold">TOTAL</span>
                            <span className="text-4xl font-extrabold tracking-tight">${gross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>

                        <button
                            onClick={downloadInvoice}
                            className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            <Download className="h-4 w-4" /> Download PDF Invoice
                        </button>
                    </div>

                    <p className="text-center text-xs text-muted-foreground">
                        UnitMaster processes this locally. No financial data is sent to our servers.
                    </p>
                </div>
            </div>

            <CalculatorContent title="Tax Guide">
                <p>
                    <strong>Exclusive Tax</strong>: You have a net price ($100) and need to add tax to bill a client ($110).
                    <br />
                    <strong>Inclusive Tax</strong>: You bought something for $110 and need to know how much tax was inside it (Reverse Calculation).
                </p>
            </CalculatorContent>
        </div>
    );
}
