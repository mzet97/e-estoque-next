import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

import { api } from '../services/apiClient';
import UserLogin from '@/models/auth/UserLogin';
import UserRegister from '@/models/auth/UserRegister';
import Token from '@/models/auth/Token';

type AuthContextData = {
    signIn: (credentials: UserLogin) => Promise<void>;
    signUp: (singUpData: UserRegister) => Promise<void>;
    signOut: () => void;
    user: Token | undefined;
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, 'nextauth.refreshToken');

    authChannel.postMessage('signOut');

    Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<Token>();
    const isAuthenticated = !!user;

    useEffect(() => {
        authChannel = new BroadcastChannel('auth');

        authChannel.onmessage = message => {
            switch (message.data) {
                case 'signOut':
                    signOut();
                    break;
                default:
                    break;
            }
        };
    }, []);

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies();

        if (token) {
            api.get('auth/refresh_token')
                .then(response => {
                    const token = response.data;

                    setUser({ ...token });
                })
                .catch(() => {
                    signOut();
                });
        }
    }, []);

    async function signIn({ username, password }: UserLogin) {
        try {
            const response = await api.post('auth/login', {
                username,
                password,
            });

            const data = response.data;
            const token: Token = { ...data };
            console.log(token);
            setCookie(undefined, 'nextauth.token', token.accessToken, {
                maxAge: token.expiresIn,
                path: '/',
            });

            setCookie(undefined, 'nextauth.refreshToken', token.refreshToken, {
                maxAge: token.refreshExpiresIn,
                path: '/',
            });

            setUser(token);

            api.defaults.headers['Authorization'] =
                `Bearer ${token.accessToken}`;

            Router.push('/dashboard');
        } catch (err) {
            console.log(err);
        }
    }

    async function signUp(userDto: UserRegister) {
        const response = await api.post('auth/register', userDto);

        const token: Token = response.data;
        console.log(token);

        if (!!token) {
            setCookie(undefined, 'nextauth.token', token.accessToken, {
                maxAge: token.expiresIn, // 30 days
                path: '/',
            });

            setCookie(undefined, 'nextauth.refreshToken', token.refreshToken, {
                maxAge: token.refreshExpiresIn,
                path: '/',
            });

            setUser(token);

            api.defaults.headers['Authorization'] =
                `Bearer ${token.accessToken}`;

            Router.push('/dashboard');
        }

        Router.push('/login');
    }

    return (
        <AuthContext.Provider
            value={{ signIn, signUp, signOut, isAuthenticated, user }}
        >
            {children}
        </AuthContext.Provider>
    );
}
