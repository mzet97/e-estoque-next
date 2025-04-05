import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const authenticateWithExternalAPI = async (email: string, password: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Auth/login`,
    {
      email,
      password,
    },
  );

  return res.data;
};

const authOptions = {
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
      authorize: async (credentials) => {
        try {
          const data = await authenticateWithExternalAPI(
            credentials.email,
            credentials.password,
          );

          if (data && data.accessToken) {
            const decoded = jwtDecode(data.accessToken) as any;
            console.log(decoded, '1');
            return {
              id: decoded.sub,
              name: decoded.preferred_username,
              email: decoded.email,
              externalToken: data.accessToken,
              roles: decoded.resource_access['e-estoque-client'].roles,
            };
          }
          throw new Error('Invalid credentials.');
        } catch (error) {
          console.error(error, '3');
          throw new Error('Invalid credentials.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.externalToken = user.externalToken;
        token.id = user.id;
      }
      console.log(token, '4');
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.externalToken = token.externalToken;
      }
      return session;
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
