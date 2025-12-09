import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CalculatorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Sub-navigation could go here if needed */}
            {children}
        </div>
    );
}
