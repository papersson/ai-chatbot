export const runtime = 'nodejs';


import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { User, user } from "@/lib/db/schema"; // Import User type and table
import { eq } from 'drizzle-orm';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
      // Add this if you need to request specific scopes
      // authorization: { params: { scope: "openid profile email" } },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT strategy
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
          //The user object is the user object returned by the adapter, the database record
          token.sub = user.id //Very important. Set the sub to the user's ID
          return {
            ...token,
            // Add any other custom claims to the token here
          }

      }

      // Return previous token if the user is still valid
      return token;
    },
    async session({ session, token }) {

        if(token.sub) {
            session.user.id = token.sub;
        }

      return session;
    },
  },
});
