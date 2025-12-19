import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { Search } from './Search';
import { UserMenu } from '@/components/auth/UserMenu';
import { createClient } from '@/lib/supabase/server';

export async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let profile = null
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('first_name')
            .eq('id', user.id)
            .single()
        profile = data

        // Fallback for Google Auth if profile/first_name is missing
        if (!profile?.first_name && user.user_metadata) {
            const fullName = user.user_metadata.full_name || user.user_metadata.name || ''
            const firstName = fullName.split(' ')[0]
            if (firstName) {
                profile = { ...profile, first_name: firstName }
            }
        }
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Calculator className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 block md:hidden lg:block">
                        UnitMaster
                    </span>
                </Link>

                <div className="flex-1 max-w-md mx-4 hidden md:block">
                    <Search />
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block">
                        Blog
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block">
                        Pricing
                    </Link>
                    <div className="md:hidden">
                        <Search mobile />
                    </div>
                    <UserMenu user={user} profile={profile} />
                </div>

            </div>
        </nav>
    );
}
