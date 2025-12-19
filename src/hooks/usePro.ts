import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function usePro() {
    const [isPro, setIsPro] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('is_pro')
                        .eq('id', user.id)
                        .single();

                    if (profile) {
                        setIsPro(profile.is_pro || false);
                    }
                }
            } catch (error) {
                console.error('Error checking pro status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkStatus();
    }, []);

    return { isPro, isLoading };
}
