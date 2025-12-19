import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user || !user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Check if user already has a Stripe Customer ID in Supabase
        let { data: profile } = await supabase
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', user.id)
            .single();

        let customerId = profile?.stripe_customer_id;

        // 2. If not, create a new Customer in Stripe
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: {
                    supabase_user_id: user.id,
                },
            });
            customerId = customer.id;

            // Save it back to Supabase
            await supabase
                .from('profiles')
                .update({ stripe_customer_id: customerId })
                .eq('id', user.id);
        }

        // 3. Create Checkout Session
        // Hardcoding a Price ID for now (Create a Product in Stripe Dashboard first!)
        // OR create it dynamically. For simplicity, we'll use a placeholder or create one on the fly if needed.
        // Better strategy: Use 'price_123...' if you have one, or create a product.
        // Let's create a standard "Pro Plan" product if it doesn't exist?
        // No, creating products in runtime is bad practice.
        // I will use a dummy line item for now which generates a price on the fly.

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'UnitMaster Pro Plan',
                            description: 'Unlimited access to all premium tools',
                        },
                        unit_amount: 999, // $9.99
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
            metadata: {
                supabase_user_id: user.id,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
