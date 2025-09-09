import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import EmailProvider from "next-auth/providers/email";
import { getServerSession, type NextAuthOptions } from "next-auth";
import * as schema from "@/db/schema";



export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens
  }),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASS!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),
  ],
  session: { strategy: "database" },
  secret: process.env.NEXTAUTH_SECRET,
};

export function auth() {
  return getServerSession(authOptions);
}