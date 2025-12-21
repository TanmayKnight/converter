import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

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

        // 3. Create Checkout Session helper
        const createSession = async (custId: string) => {
            return await stripe.checkout.sessions.create({
                customer: custId,
                line_items: [
                    {
                        price: process.env.STRIPE_PRICE_ID_PRO,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                allow_promotion_codes: true, // Enable coupons for "SAVE 50%" logic if they want to use codes
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
                metadata: {
                    supabase_user_id: user.id,
                },
            });
        };

        let session;
        try {
            session = await createSession(customerId);
        } catch (error: any) {
            // Handle "No such customer" error (common when switching Test -> Live keys)
            // Stripe error code: resource_missing, param: customer
            if (error.code === 'resource_missing' && error.param === 'customer') {
                console.warn('Stripe Customer not found (likely Test ID in Live mode). Creating new customer...');

                // Create NEW Customer (Live)
                const newCustomer = await stripe.customers.create({
                    email: user.email,
                    metadata: {
                        supabase_user_id: user.id,
                    },
                });
                customerId = newCustomer.id;

                // Update Supabase with new ID
                await supabase
                    .from('profiles')
                    .update({ stripe_customer_id: customerId })
                    .eq('id', user.id);

                // Retry Session Creation
                session = await createSession(customerId);
            } else {
                throw error;
            }
        }

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
