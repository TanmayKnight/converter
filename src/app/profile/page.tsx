import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileContent } from '@/components/profile/ProfileContent'

export const metadata = {
    title: 'My Profile | UnitMaster',
}

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch profile data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <ProfileContent user={user} profile={profile || {}} />
        </div>
    )
}
