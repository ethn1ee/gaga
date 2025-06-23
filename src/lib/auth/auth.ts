import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.NEXT_PUBKIC_BETTER_AUTH_SECRET,
  secret: process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
});
