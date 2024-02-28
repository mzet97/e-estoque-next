/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { api } from '@/services/apiClient';

export default function canAccess(Component: any) {
    return function CanAccess(props: any) {
        const router = useRouter();
        const { data: session } = useSession();

        console.log('Session', session);
        useEffect(() => {
            if (!!session?.user) {
                return router.push('/');
            }
        }, []);

        if (!!!session?.user) {
            return null;
        }

        api.defaults.headers['Authorization'] = `Bearer ${session.user.jwt}`;
        return <Component {...props} />;
    };
}
