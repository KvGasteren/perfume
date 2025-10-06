import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import * as authSchema from "@/db/auth-schema";
import { Resend } from "resend";

const resend = new Resend(process.env.EMAIL_SERVER_PASS!); // <-- standard var name

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: authSchema.users,
    accountsTable: authSchema.accounts,
    sessionsTable: authSchema.sessions,
    verificationTokensTable: authSchema.verificationTokens,
  }),
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,  // e.g. no-reply@perfume.koenvangasteren.nl
          to: identifier,
          subject: "Sign in to Perfume",
          html: `<p>Click <a href="${url}">this magic link</a> to sign in.</p>`,
          text: `Sign in: ${url}`,
        });
      },
    }),
  ],
  session: { strategy: "database" },
  // Optional: customize pages later
  // pages: { signIn: "/signin" },
};
