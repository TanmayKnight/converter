'use client';

import { useState } from 'react';
import { Download, Receipt, Calculator, Store, BadgeDollarSign, DollarSign, Percent, FileText, User, Building, MapPin, Calendar, Hash } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorContent } from '@/components/CalculatorContent';
import { toast } from 'sonner';

type Mode = 'exclusive' | 'inclusive';
type View = 'calculator' | 'invoice';

export function TaxCalculatorClient() {
    // View State
    const [view, setView] = useState<View>('calculator');

    // Calculator State
    const [price, setPrice] = useState<string>('100');
    const [rate, setRate] = useState<string>('10');
    const [mode, setMode] = useState<Mode>('exclusive');
    const [taxName, setTaxName] = useState<string>('GST/VAT');

    // Invoice State
    const [senderName, setSenderName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [senderTaxId, setSenderTaxId] = useState('');

    const [clientName, setClientName] = useState('');
    const [clientAddress, setClientAddress] = useState('');

    const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [currency, setCurrency] = useState('$');

    // Derived Results
    const p = parseFloat(price) || 0;
    const r = parseFloat(rate) || 0;

    let net = 0;
    let taxAmount = 0;
    let gross = 0;

    if (mode === 'exclusive') {
        net = p;
        taxAmount = p * (r / 100);
        gross = net + taxAmount;
    } else {
        gross = p;
        net = gross / (1 + (r / 100));
        taxAmount = gross - net;
    }

    const downloadInvoice = () => {
        const doc = new jsPDF();

        // 1. Header Section (Professional White Layout)
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('INVOICE', 14, 20);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100);

        // Sender Details (Right Aligned or Left below title)
        doc.text(senderName || 'Your Business Name', 14, 30);
        doc.text(senderAddress || 'Your Business Address', 14, 35);
        if (senderTaxId) {
            doc.text(`Tax ID: ${senderTaxId}`, 14, 40);
        }

        // Invoice Meta (Right Aligned)
        const rightX = 140;
        doc.setFont('helvetica', 'bold');
        doc.text(`Invoice #:`, rightX, 30);
        doc.text(`Date:`, rightX, 35);
        // doc.text(`Amount Due:`, rightX, 45);

        doc.setFont('helvetica', 'normal');
        doc.text(invoiceNumber, rightX + 25, 30);
        doc.text(invoiceDate, rightX + 25, 35);
        // doc.setFontSize(12);
        // doc.text(`${currency}${gross.toFixed(2)}`, rightX + 25, 45);

        // Client Details (Bill To)
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('BILL TO', 14, 55);
        doc.setTextColor(0);
        doc.setFontSize(11);
        doc.text(clientName || 'Client Name', 14, 62);
        doc.setFontSize(10);
        doc.text(clientAddress || 'Client Address', 14, 67);

        // 2. The Table
        const tableBody = [
            ['Professional Services / Product', currency + net.toLocaleString(undefined, { minimumFractionDigits: 2 })],
        ];

        // Add Tax Rows
        // We'll use the footers for totals, but let's put the line item first

        autoTable(doc, {
            startY: 80,
            head: [['Description', 'Amount']],
            body: tableBody,
            theme: 'plain', // Cleaner look
            headStyles: {
                fillColor: [240, 240, 240],
                textColor: [50, 50, 50],
                fontStyle: 'bold',
                lineWidth: 0
            },
            styles: {
                fontSize: 10,
                cellPadding: 4,
            },
            columnStyles: {
                1: { halign: 'right' }
            },
        });

        // 3. Totals Section (Below Table)
        const finalY = (doc as any).lastAutoTable.finalY + 10;
        const totalX = 130;
        const valX = 195; // Right aligned

        doc.setFontSize(10);
        // Subtotal
        doc.text('Subtotal:', totalX, finalY);
        doc.text(`${currency}${net.toFixed(2)}`, valX, finalY, { align: 'right' });

        // Tax
        doc.text(`${taxName} (${rate}%):`, totalX, finalY + 6);
        doc.text(`${currency}${taxAmount.toFixed(2)}`, valX, finalY + 6, { align: 'right' });

        // Divider Line
        doc.setLineWidth(0.5);
        doc.line(totalX, finalY + 10, valX, finalY + 10);

        // Total
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Total:', totalX, finalY + 18);
        doc.text(`${currency}${gross.toFixed(2)}`, valX, finalY + 18, { align: 'right' });

        // 4. Footer / Payment Notes
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Payment Instructions:', 14, finalY + 40);
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text('Please pay within 30 days. Thank you for your business!', 14, finalY + 45);

        // Legal Brand Line (Subtle)
        doc.setFontSize(8);
        doc.setTextColor(200);
        doc.text('Generated professionally via UnitMaster.io', 14, 280);

        doc.save(`Invoice_${invoiceNumber}.pdf`);
        toast.success("Professional Invoice Downloaded");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Tax & Invoice Generator</h1>
                <p className="text-muted-foreground">Calculate taxes or create legally valid PDF invoices for your clients.</p>
            </div>

            {/* Mode Switcher */}
            <div className="flex justify-center mb-10">
                <div className="bg-secondary p-1 rounded-xl flex gap-1">
                    <button
                        onClick={() => setView('calculator')}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${view === 'calculator' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <Calculator className="h-4 w-4" /> Quick Calculator
                    </button>
                    <button
                        onClick={() => setView('invoice')}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${view === 'invoice' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <FileText className="h-4 w-4" /> Invoice Generator
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="space-y-6">
                    {/* Basic Math (Common to both) */}
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
                                <label className="text-sm font-medium">Amount</label>
                                <div className="flex gap-2 mt-1">
                                    <input type="text" value={currency} onChange={e => setCurrency(e.target.value)} className="w-16 bg-secondary/50 rounded-xl py-2 px-3 outline-none text-center" placeholder="$" />
                                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 px-3 outline-none focus:ring-2 focus:ring-slate-500/20" />
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
                                <label className="text-sm font-medium">Tax Name</label>
                                <div className="relative mt-1">
                                    <BadgeDollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="text" value={taxName} onChange={e => setTaxName(e.target.value)} className="w-full bg-secondary/50 rounded-xl py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-slate-500/20" placeholder="e.g. GST" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Specific Details */}
                    {view === 'invoice' && (
                        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm animate-in fade-in slide-in-from-top-4">
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Building className="h-4 w-4" /> Business Details
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" value={senderName} onChange={e => setSenderName(e.target.value)} className="bg-secondary/50 rounded-xl px-3 py-2 text-sm outline-none" placeholder="Your Business Name" />
                                    <input type="text" value={senderTaxId} onChange={e => setSenderTaxId(e.target.value)} className="bg-secondary/50 rounded-xl px-3 py-2 text-sm outline-none" placeholder="Tax ID / GSTIN" />
                                </div>
                                <textarea value={senderAddress} onChange={e => setSenderAddress(e.target.value)} className="w-full bg-secondary/50 rounded-xl px-3 py-2 text-sm outline-none resize-none h-20" placeholder="Your Business Address..." />
                            </div>

                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 mt-6 flex items-center gap-2">
                                <User className="h-4 w-4" /> Client Details
                            </h2>
                            <div className="space-y-4">
                                <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full bg-secondary/50 rounded-xl px-3 py-2 text-sm outline-none" placeholder="Client Name" />
                                <textarea value={clientAddress} onChange={e => setClientAddress(e.target.value)} className="w-full bg-secondary/50 rounded-xl px-3 py-2 text-sm outline-none resize-none h-20" placeholder="Client Address..." />
                            </div>

                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 mt-6 flex items-center gap-2">
                                <Hash className="h-4 w-4" /> Meta
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className="bg-secondary/50 rounded-xl px-3 py-2 text-sm outline-none" placeholder="INV-001" />
                                <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} className="bg-secondary/50 rounded-xl px-3 py-2 text-sm outline-none" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Preview */}
                <div className="space-y-6 lg:sticky lg:top-8">
                    <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-8 relative overflow-hidden shadow-xl">
                        {/* Preview Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                                    {view === 'invoice' ? 'Invoice Preview' : 'Calculation'}
                                </div>
                                {view === 'invoice' && <div className="text-2xl font-bold">{senderName || 'Your Business'}</div>}
                            </div>
                            {view === 'invoice' && (
                                <div className="text-right">
                                    <div className="text-sm font-bold">{invoiceNumber}</div>
                                    <div className="text-xs text-muted-foreground">{invoiceDate}</div>
                                </div>
                            )}
                        </div>

                        {/* Middle: The Numbers */}
                        <div className="space-y-4 border-b border-dashed border-border pb-6 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-semibold">{currency}{net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between items-center text-red-500">
                                <span>{taxName} ({rate}%)</span>
                                <span className="font-semibold">+{currency}{taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        {/* Bottom: Total */}
                        <div className="flex justify-between items-end mb-8">
                            <span className="text-xl font-bold">TOTAL</span>
                            <span className="text-4xl font-extrabold tracking-tight">{currency}{gross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>

                        {/* Action */}
                        <button
                            onClick={downloadInvoice}
                            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                        >
                            <Download className="h-5 w-5" />
                            {view === 'invoice' ? 'Download Professional Invoice' : 'Download Summary PDF'}
                        </button>
                    </div>

                    {view === 'invoice' && (
                        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-sm text-blue-700 dark:text-blue-300">
                            <strong>Note:</strong> We do not store this data. The PDF is generated locally in your browser. It is legally valid for freelance/consulting work.
                        </div>
                    )}
                </div>
            </div>

            <CalculatorContent title="Tax Guide">
                {view === 'invoice' ? (
                    <p>Ensure your invoice includes your <strong>Tax ID / GSTIN</strong> if you are a registered business. This allows your client to claim Input Tax Credit.</p>
                ) : (
                    <p>
                        <strong>Exclusive Tax</strong>: You have a net price ($100) and need to add tax to bill a client ($110).
                        <br />
                        <strong>Inclusive Tax</strong>: You bought something for $110 and need to know how much tax was inside it (Reverse Calculation).
                    </p>
                )}
            </CalculatorContent>
        </div>
    );
}
