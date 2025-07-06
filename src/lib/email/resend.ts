import { env } from "@/env";
import { Resend } from "resend";

export const resend = new Resend(env.NEXT_PUBLIC_RESEND_API_KEY);
