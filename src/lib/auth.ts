import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from "./db";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "@/app/(auth)/actions/send-email-action";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    sendResetPassword: async ({ url, user }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        meta: {
          description: "Please click the link below to reset your password",
          link: String(url),
        },
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [nextCookies()],
});
