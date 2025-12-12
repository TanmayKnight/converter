
import { Metadata } from 'next'
import { AuthForm } from '@/components/auth/AuthForm'

export const metadata: Metadata = {
    title: 'Sign In | UnitMaster',
    description: 'Access your UnitMaster account to save your preferences and data.',
}

export default function LoginPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-muted/30">
            <AuthForm />
        </div>
    )
}
