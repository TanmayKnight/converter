'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface CheckoutButtonProps {
    isLoggedIn: boolean;
    className?: string;
}

export function CheckoutButton({ isLoggedIn, className }: CheckoutButtonProps) {
    const router = useRouter();

    const handleClick = async () => {
        if (!isLoggedIn) {
            toast.info("Please log in to account first.");
            const returnUrl = encodeURIComponent('/pricing');
            router.push(`/login?next=${returnUrl}`);
            return;
        }

        try {
            toast.loading("Redirecting to checkout...");
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
            });
            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("Failed to start checkout");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Button onClick={handleClick} className={className}>
            Get Started
        </Button>
    );
}
