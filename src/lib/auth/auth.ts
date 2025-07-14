import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";

import { env } from "@/env";
import { sendEmail } from "../email";

const FROM_EMAIL = "EmoryLife <hello@emorylife.net>";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: env.NEXT_PUBLIC_BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        let subject;
        switch (type) {
          case "email-verification":
            subject = "Verify your email for EmoryLife";
            break;
          case "forget-password":
            subject = "Reset your password for EmoryLife";
            break;
          default:
            throw new Error("Invalid OTP type");
        }

        const { error } = await sendEmail({
          from: FROM_EMAIL,
          to: email,
          subject,
          text: `Enter the code ${otp}. This code expires in 5 minutes.`,
        });

        if (error) {
          throw new Error(error.message);
        }
      },
    }),
    nextCookies(),
  ],
});
