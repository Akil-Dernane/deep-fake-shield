import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { use } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. Define and EXPORT the options
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Sentinel Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${API_URL}/api/auth/login/`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access;
        token.refreshToken = user.refresh;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      try {
        await fetch(`${API_URL}/api/token/blacklist/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: token.refreshToken }),
        });
      } catch (error) {
        console.error("Backend sign-out notification failed:", error);
      }
    },
  },
  pages: {
    signIn: "/auth",
  },
};

// 2. Pass the options to the handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
