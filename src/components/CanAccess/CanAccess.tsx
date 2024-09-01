/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { api } from '@/services/apiClient';

export default function canAccess(Component: any) {
    return function CanAccess(props: any) {
        const router = useRouter();
        const { data: session, status } = useSession();

        useEffect(() => {
            if (status === 'loading') return;
            if (!session?.user) {
                router.push('/');
            }
        }, [session, status, router]);

        if (status === 'loading' || !session?.user) {
            return null;
        }

        api.defaults.headers['Authorization'] = `Bearer ${session.user.jwt}`;

        return <Component {...props} />;
    };
}