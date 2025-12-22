import { Metadata } from 'next';
import { TaxCalculatorClient } from '@/components/calculators/TaxCalculatorClient';
import { SeoContentSection } from '@/components/seo/SeoContentSection';

export const metadata: Metadata = {
    title: 'Tax & Invoice Generator - GST, VAT & Legal Invoices',
    description: 'Calculate GST/VAT and generate professional PDF invoices instantly. Features automatic Tax ID validation (GSTIN/VAT) and legal invoice templates. Works offline.',
    alternates: {
        canonical: 'https://unitmaster.io/calculators/finance/tax',
    },
    openGraph: {
        title: 'Tax & Invoice Generator | UnitMaster',
        description: 'Create legal PDF invoices and calculate taxes with ID validation. Private & Secure.',
        url: 'https://unitmaster.io/calculators/finance/tax',
        type: 'website',
    },
    keywords: ['gst calculator', 'vat calculator offline', 'invoice generator pdf', 'tax invoice creator', 'freelance invoice maker'],
};

export default function TaxPage() {
    return (
        <div className="space-y-8">
            <TaxCalculatorClient />

            <SeoContentSection
                title="Professional Invoice Generator & Tax Calculator"
                description="Freelancers and small businesses need more than just a calculator. UnitMaster combines a powerful GST/VAT calculator with a Legal Invoice Generator. Create compliant PDF invoices, validate Tax IDs check automatically, and send professional estimates to clients. All running offline."
                features={[
                    {
                        title: "Legal PDF Invoices",
                        description: "Generate professionally formatted PDF invoices that are ready to send to clients."
                    },
                    {
                        title: "Tax ID Validation",
                        description: "Automatically validate formats for GSTIN, VAT, and other tax registration numbers."
                    },
                    {
                        title: "Inclusive/Exclusive",
                        description: "Instantly switch between adding tax on top (Exclusive) or extracting tax from a total (Inclusive)."
                    }
                ]}
                benefits={[
                    "Create invoices free.",
                    "Ensure tax compliance.",
                    "Save time on math.",
                    "100% Private Data."
                ]}
                faqs={[
                    {
                        question: "What is the difference between GST and VAT?",
                        answer: "GST (Goods and Services Tax) is a single tax on the supply of goods and services (common in Australia, India, Canada). VAT (Value Added Tax) is charged at each stage of production (common in UK/EU). Functionally, they are very similar."
                    },
                    {
                        question: "How do I calculate tax-inclusive prices?",
                        answer: "To find the tax amount in a total price, use the formula: Tax = Total Note - (Total / (1 + Rate)). For example, if Total is $110 and tax is 10%, Tax = 110 - (110/1.1) = $10."
                    },
                    {
                        question: "What is Input Tax Credit (ITC)?",
                        answer: "ITC allows businesses to claim credit for the taxes paid on purchases. You subtract the tax you paid to suppliers from the tax you collected from customers, paying only the difference to the government."
                    },
                    {
                        question: "Input Tax Credit (ITC) Explained",
                        answer: "For business owners, GST/VAT is not a cost; it is a flow-through. You collect tax from customers and pay tax to suppliers. You only pay the government the difference."
                    }
                ]}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "FinancialProduct",
                    "name": "Tax & Invoice Generator",
                    "description": "A tool to calculate taxes and generate legal invoices.",
                    "brand": {
                        "@type": "Brand",
                        "name": "UnitMaster"
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }}
            />
        </div>
    );
}
