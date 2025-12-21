import { Metadata } from 'next';
import PassportPhotoClient from './client';

export const metadata: Metadata = {
    title: 'Free Passport Photo Maker - Create Biometric ID Photos Online',
    description: 'Create compliant 2x2 inch passport photos for US, UK, India, and EU visas. Free online tool with face alignment, background requirement check, and instant download.',
    keywords: ['passport photo', 'visa photo', 'id photo maker', '2x2 inch photo', 'biometric photo', 'passport size photo', 'us passport photo', 'uk passport photo'],
    openGraph: {
        title: 'Free Passport Photo Maker | UnitMaster',
        description: 'Create compliant 2x2 inch passport and visa photos instantly. Free & Privacy-focused.',
        type: 'website',
    },
};

export default function PassportPhotoPage() {
    return <PassportPhotoClient />;
}
