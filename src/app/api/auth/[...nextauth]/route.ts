import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,   // 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !user) return false;
      const client = await clientPromise;
      const db = client.db();
      const users = db.collection("users");
      // For OAuth accounts
      if (account.provider !== "credentials") {
        if (!user.email) return false;
        const existing = await users.findOne({ email: user.email });
        if (existing && !existing.oauthProvider) {
          // Optional: update user record to indicate OAuth linkage
          await users.updateOne(
            { _id: new ObjectId(existing._id) },
            { $set: { oauthProvider: account.provider } }
          );
          user.id = existing._id.toString();
          return true;
        }
        if (!existing) {
          // Create new record for OAuth user
          await users.insertOne({
            email: user.email,
            name: user.name || user.email,
            oauthProvider: account.provider,
            createdAt: new Date(),
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user && typeof session.user === 'object') {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 