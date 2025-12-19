'use client'

import { useState, useEffect } from 'react'
import { LogOut, Save, User as UserIcon, Mail, Phone, Calendar, MapPin, KeyRound, Pencil, CreditCard, Sparkles } from 'lucide-react'
import { EditProfileForm } from '@/components/profile/EditProfileForm'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { ProfileData } from '@/lib/types/profile'

export function ProfileContent({
    user,
    profile,
    isPro: initialIsPro
}: {
    user: any,
    profile: ProfileData,
    isPro: boolean
}) {
    const router = useRouter()
    const supabase = createClient()
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userProfile, setUserProfile] = useState(profile)
    const [isProUser, setIsProUser] = useState(initialIsPro)

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const sessionId = searchParams.get('session_id');

        if (sessionId) {
            const syncSubscription = async () => {
                const toastId = toast.loading("Verifying subscription...");
                try {
                    const res = await fetch(`/api/stripe/sync?session_id=${sessionId}`);
                    if (res.ok) {
                        toast.success("Subscription Active! You are now Pro.", { id: toastId });
                        setIsProUser(true);
                        // Clean URL
                        window.history.replaceState({}, '', '/profile');
                        router.refresh();
                    } else {
                        const data = await res.json();
                        toast.error(data.error || "Verification failed.", { id: toastId });
                    }
                } catch (e) {
                    toast.error("Sync error", { id: toastId });
                }
            };
            syncSubscription();
        }
    }, [router]);

    const firstName = userProfile?.first_name || 'User'
    const lastName = userProfile?.last_name || ''
    const fullName = `${firstName} ${lastName}`.trim()
    const initials = (firstName[0] || '') + (lastName[0] || '')

    const sendPasswordReset = async () => {
        if (!user?.email) return
        const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo: `${window.location.origin}/profile/update-password`,
        })
        if (!error) {
            toast.success('Password reset email sent.')
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.replace('/')
    }

    const handleManageSubscription = async () => {
        try {
            toast.loading("Opening billing portal...");
            const response = await fetch('/api/stripe/portal', {
                method: 'POST',
            });
            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("Failed to open portal");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    const handleUpgrade = () => {
        router.push('/pricing');
    }

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-zinc-900 shadow-lg relative">
                        {initials || <UserIcon className="h-10 w-10" />}
                        {isProUser && (
                            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 p-1.5 rounded-full border-2 border-white dark:border-zinc-900" title="Pro Member">
                                <Sparkles className="h-4 w-4 fill-yellow-900" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{fullName || 'Welcome!'}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            {isProUser ? (
                                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-700 dark:text-yellow-400 text-xs font-semibold border border-yellow-200 dark:border-yellow-800 flex items-center gap-1">
                                    <Sparkles className="h-3 w-3" />
                                    Pro Member
                                </span>
                            ) : (
                                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 flex items-center gap-1">
                                    Free Plan
                                </span>
                            )}
                            <span className="text-sm text-zinc-500">{user.email}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={sendPasswordReset}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-200 rounded-lg transition-colors font-medium text-sm"
                    >
                        <KeyRound className="h-4 w-4" />
                        Change Password
                    </button>
                    <button
                        onClick={signOut}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg transition-all border border-zinc-200 dark:border-zinc-700 shadow-sm font-medium text-sm"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Account Status Card */}
                <div className={`bg-white dark:bg-zinc-900 border ${isProUser ? 'border-yellow-500/50 dark:border-yellow-500/30' : 'border-zinc-200 dark:border-zinc-800'} rounded-xl overflow-hidden shadow-sm`}>
                    <div className={`px-6 py-4 border-b ${isProUser ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50'} flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                            <CreditCard className={`h-5 w-5 ${isProUser ? 'text-yellow-600 dark:text-yellow-500' : 'text-zinc-500'}`} />
                            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Subscription & Billing</h2>
                        </div>
                        {isProUser && (
                            <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">Active</span>
                        )}
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <div className="text-sm font-medium text-zinc-500 mb-1">Current Plan</div>
                                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                                    {isProUser ? 'UnitMaster Pro' : 'Free Starter'}
                                </div>
                                <p className="text-sm text-zinc-500 mt-1 max-w-md">
                                    {isProUser
                                        ? 'You have access to all premium features, unlimited batch processing, and priority support.'
                                        : 'Upgrade to Pro to unlock unlimited batch processing, high-quality downloads, and ad-free experience.'
                                    }
                                </p>
                            </div>

                            <div>
                                {isProUser ? (
                                    <Button onClick={handleManageSubscription} variant="outline" className="border-zinc-200 dark:border-zinc-700">
                                        Manage Subscription
                                    </Button>
                                ) : (
                                    <Button onClick={handleUpgrade} className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity border-0">
                                        Upgrade to Pro
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Details Card */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <UserIcon className="h-5 w-5 text-zinc-500" />
                            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Personal Details</h2>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                        >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit Profile
                        </button>
                    </div>

                    <div className="p-6 grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">First Name</label>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 text-lg">
                                {profile?.first_name || <span className="text-zinc-400 italic">Not set</span>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Last Name</label>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 text-lg">
                                {profile?.last_name || <span className="text-zinc-400 italic">Not set</span>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Email Address</label>
                            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium">
                                <Mail className="h-4 w-4 text-zinc-400" />
                                {user.email}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Phone Number</label>
                            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium">
                                <Phone className="h-4 w-4 text-zinc-400" />
                                {profile?.phone || <span className="text-zinc-400 italic">Not provided</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Card */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-zinc-500" />
                        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Address</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Street Address</label>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {profile?.street || <span className="text-zinc-400 italic">Not provided</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">City</label>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {profile?.city || <span className="text-zinc-400 italic">-</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">State / Province</label>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {profile?.state || <span className="text-zinc-400 italic">-</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Postal Code</label>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {profile?.zip_code || <span className="text-zinc-400 italic">-</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Country</label>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {profile?.country || <span className="text-zinc-400 italic">-</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <EditProfileForm profile={profile} onClose={() => setIsEditing(false)} />
            )}
        </>
    )
}
