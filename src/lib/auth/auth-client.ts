"use client";

import { env } from "@/env";
import { emailOTPClient, magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [emailOTPClient(), magicLinkClient()],
});
