import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await axios(`${process.env.HOST_URL}/api/auth/login`, {
          method: 'POST',
          withCredentials: true,
          data: {
            email: credentials?.email,
            password: credentials?.password,
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }).catch((err) => {
          console.log(err.response.data.error.message);
          throw new Error(err.response.data.error.message);
        });

        const data = await res.data;

        const user = {
          id: data?.data.user?._id,
          name: data?.data.user?.name,
          email: data?.data.user?.email,
          role: data?.data.user?.role,
          accessToken: data?.data?.access_token,
          refreshToken: data?.data?.refresh_token,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    //register
    // The name to display on the sign in form (e.g. "Sign in with...")
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('token', token);
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      console.log('session', session);

      return session;
    },
  },
};
export default NextAuth(authOptions);
