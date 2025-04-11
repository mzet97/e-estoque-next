import NextAuth, { DefaultSession } from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
  tokenType: string;
  notBeforePolicy: string;
  sessionState: string;
  scope: string;
}

interface KeycloakToken {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  nonce: string;
  session_state: string;
  name: string;
  given_name: string;
  family_name: string;
  preferred_username: string;
  email: string;
  email_verified: boolean;
  resource_access: {
    'e-estoque-client': {
      roles: string[];
    };
  };
}

const authenticateWithExternalAPI = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/Auth/login`,
      {
        email,
        password,
      },
    );
    return res.data;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

const authOptions: NextAuthConfig = {
  pages: {
    signIn: '/auth/signIn',
    signOut: '/auth/signIn',
    error: '/auth/signIn',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            return null;
          }

          const data = await authenticateWithExternalAPI(email, password);

          if (data?.accessToken) {
            const decoded = jwtDecode<KeycloakToken>(data.accessToken);
            
            return {
              id: decoded.sub,
              name: decoded.name || decoded.preferred_username,
              email: decoded.email,
              externalToken: data.accessToken,
              roles: decoded.resource_access?.['e-estoque-client']?.roles || [],
            };
          }
          return null;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          externalToken: user.externalToken,
          roles: user.roles,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          externalToken: token.externalToken,
          roles: token.roles,
        },
      };
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export const GET = handlers.GET;
export const POST = handlers.POST;

export { signIn, signOut, auth };
