
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, Mail, Phone, AlertCircle } from 'lucide-react'
import { LocationSelector } from '@/components/common/LocationSelector'
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js'

export function AuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    // Address & Phone State
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')
    const [countryIso, setCountryIso] = useState('')
    const [phoneCode, setPhoneCode] = useState('')

    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState<'signin' | 'signup'>('signin')
    const [message, setMessage] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    // Validation Helpers
    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const validateZipCode = (zip: string, country: string) => {
        // Simplified check: Ensure numeric and reasonable length for most countries
        // For US, we want exactly 5 digits for now (or 5-4)
        if (country === 'United States') {
            return /^\d{5}(-\d{4})?$/.test(zip)
        }
        return zip.length >= 3 && zip.length <= 10
    }

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            if (mode === 'signup') {
                // Strict Validation
                if (!validateEmail(email)) throw new Error("Please enter a valid email address.")

                // Phone Validation
                try {
                    const phoneNumber = parsePhoneNumber(phone, countryIso as CountryCode)
                    if (!phoneNumber || !phoneNumber.isValid()) {
                        throw new Error(`Invalid phone number for ${country}.`)
                    }
                } catch (err) {
                    // If libphonenumber fails to parse, it's invalid
                    throw new Error(`Invalid phone number format for ${country}.`)
                }

                // Zip Validation
                if (!validateZipCode(zipCode, country)) {
                    throw new Error(`Invalid Zip/Postal Code for ${country}.`)
                }

                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                        data: {
                            first_name: firstName,
                            last_name: lastName,
                            phone: `${phoneCode}${phone}`, // Save with country code
                            street: street,
                            city: city,
                            state: state,
                            zip_code: zipCode,
                            country: country
                        }
                    },
                })
                if (error) throw error
                if (error) throw error
                // Redirect to verification page
                router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`)
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                router.refresh()
                router.push('/profile')
            }
        } catch (error: any) {
            console.error('Sign Up Error:', error)
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
        if (error) setMessage(error.message)
        setLoading(false)
    }

    return (
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8">
            <div className="flex justify-center mb-8">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg inline-flex">
                    <button
                        onClick={() => setMode('signin')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${mode === 'signin' ? 'bg-white dark:bg-zinc-700 shadow-sm text-primary' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setMode('signup')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${mode === 'signup' ? 'bg-white dark:bg-zinc-700 shadow-sm text-primary' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'}`}
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-2 tracking-tight">
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-center text-zinc-500 text-sm mb-8">
                {mode === 'signin' ? 'Enter your details to access your account' : 'Start your journey with UnitMaster today'}
            </p>

            <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === 'signup' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">First Name</label>
                                <input
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-zinc-800 dark:text-white"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-zinc-800 dark:text-white"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Location Settings</span>
                                {country && <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{country}</span>}
                            </div>

                            <LocationSelector
                                onChange={(val) => {
                                    setCountry(val.country)
                                    setState(val.state)
                                    setCity(val.city)
                                    setPhoneCode(val.phoneCode)
                                    setCountryIso(val.isoCode)
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    required
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 bg-white dark:bg-zinc-800 dark:text-white ${zipCode && country && !validateZipCode(zipCode, country)
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-zinc-300 dark:border-zinc-700 focus:ring-primary'
                                        }`}
                                    placeholder="ZIP Code"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Phone Number</label>
                            <div className="relative flex">
                                <div className="flex items-center justify-center px-3 border border-r-0 border-zinc-300 dark:border-zinc-700 rounded-l-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-500 font-mono text-sm min-w-[3.5rem]">
                                    {phoneCode || '--'}
                                </div>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="flex-1 w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-zinc-800 dark:text-white"
                                    placeholder="(555) 000-0000"
                                    disabled={!country}
                                />
                            </div>
                            {!country && <p className="text-xs text-zinc-500 mt-1">Select a country first</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Street Address</label>
                            <input
                                type="text"
                                required
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-zinc-800 dark:text-white"
                                placeholder="123 Main St"
                            />
                        </div>

                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-zinc-800 dark:text-white"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-zinc-800 dark:text-white"
                        placeholder="••••••••"
                        minLength={6}
                    />
                </div>

                {message && (
                    <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${message.includes('Check') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex justify-center items-center"
                >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (mode === 'signin' ? 'Sign In' : 'Create Account')}
                </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-200 dark:border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-zinc-900 text-zinc-500">Or continue with</span>
                </div>
            </div>

            <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 border border-zinc-300 dark:border-zinc-700 py-2.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium text-zinc-700 dark:text-zinc-200"
            >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                Google
            </button>
        </div>
    )
}
