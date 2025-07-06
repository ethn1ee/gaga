"use server";

import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

type SendEmailProps = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export const sendEmail = async ({
  from,
  to,
  subject,
  text,
}: SendEmailProps) => {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    text,
  });

  return { data, error };
};
