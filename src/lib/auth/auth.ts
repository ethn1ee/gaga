import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

import { env } from "@/env";
import { resend } from "../email";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: env.NEXT_PUBLIC_BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: false,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ url, token }) => {
      const { error } = await resend.emails.send({
        from: "EmoryLife <onboarding@resend.dev>",
        to: "ethantlee21@gmail.com", // user.email,
        subject: "Verify your email for EmoryLife",
        html: `Click the link to verify your email: ${url} ${token}`,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
  },
  plugins: [username(), nextCookies()],
});
