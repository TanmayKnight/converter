export type ProfileData = {
    first_name: string | null
    last_name: string | null
    phone: string | null
    street: string | null
    city: string | null
    state: string | null
    zip_code: string | null
    country: string | null
    is_pro?: boolean
    stripe_customer_id?: string | null
    subscription_status?: string | null
}
