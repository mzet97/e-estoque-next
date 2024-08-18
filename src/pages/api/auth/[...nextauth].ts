import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from '@/services/authServices';

const MINUTE = 60;
const HOUR = 60 * MINUTE;

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials, req) {
                console.log('Inside authorize function');
                if (!credentials) {
                    console.log('No credentials provided');
                    throw new Error('No credentials provided');
                }

                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                console.log('credentials', credentials);
                const { token, decoded, error } = await signIn({
                    email,
                    password,
                });
                if (token) {
                    return {
                        id: decoded.sid,
                        name: decoded.email,
                        email: decoded.email,
                        image: null,
                        jwt: token.accessToken,
                    };
                }
                if (error) {
                    console.error('error', error);
                    throw new Error(error);
                }
                return null;
            },
        }),
    ],
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    session: {
        maxAge: 8 * HOUR, // 8 hours
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = +user.id;
                token.jwt = user.jwt;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user.id = token.id + '';
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.jwt = token.jwt;
            session.user.token = token;
            return session;
        },
    },
};

export default NextAuth(authOptions);
