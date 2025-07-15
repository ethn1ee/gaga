"use server";

import { env } from "@/env";
import { Resend } from "resend";

const FROM_EMAIL = "EmoryLife <hello@emorylife.net>";

const resend = new Resend(env.RESEND_API_KEY);

type SendEmailProps = {
  to: string;
  subject: string;
  text: string;
};

export const sendEmail = async ({ to, subject, text }: SendEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    text,
  });

  return { data, error };
};
