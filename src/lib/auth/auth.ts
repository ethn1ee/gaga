import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

import { env } from "@/env";
import { sendEmail } from "../email";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: env.NEXT_PUBLIC_BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const { error } = await sendEmail({
        from: "EmoryLife <hello@emorylife.net>",
        to: user.email,
        subject: "Verify your email for EmoryLife",
        text: `Click the link to verify your email: ${url}`,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    onEmailVerification: async ({ id }) => {
      await prisma.user.update({
        where: { id: id },
        data: { emailVerified: true },
      });
    },
  },
  plugins: [username(), nextCookies()],
});
