import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Token {
        accessToken: string;
        expiresIn: number;
        refreshToken: string;
        refreshExpiresIn: number;
        tokenType: string;
        notBeforePolicy: string;
        sessionState: string;
        scope: string;
    }

    interface Session {
        user: User;
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        token?: Token | null;
        jwt?: string | null;
    }
}
