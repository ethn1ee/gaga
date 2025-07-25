"use server";

import { env } from "@/env";
import { sendEmail } from "@/lib/email";
import { api } from "@/trpc/server";

type SendVerificationProps = {
  userId: string;
  name: string;
  emoryEmail: string;
};

export const sendAffiliationVerification = async ({
  userId,
  name,
  emoryEmail,
}: SendVerificationProps) => {
  const identifier = `affiliation-${userId}-${emoryEmail}`;
  console.log(identifier);
  const result = await api.verification.create(identifier);
  console.log(result);
  const link = `${env.NEXT_PUBLIC_BASE_URL}/verify-affiliation?id=${result.id}&token=${result.value}`;
  console.log("create verication:", result);
  console.log(emoryEmail, userId, name);
  return await sendEmail({
    to: emoryEmail,
    subject: `Verify Emory Affiliation for ${name}`,
    text: `Click the following link to verify Emory affiliation for ${name} at EmoryLife:\n\n${link}\n\nThis link expires in 24 hours.`,
  });
};

type VerifyAffiliationProps = {
  id: string;
  token: string;
};

export const verifyAffiliation = async ({
  id,
  token,
}: VerifyAffiliationProps): Promise<boolean> => {
  const verificationResult = await api.verification.verify({ id, token });

  if (!verificationResult) return false;

  const userId = verificationResult.identifier.split("-")[1];

  if (!userId) return false;

  await api.user.update({
    id: userId,
    data: {
      emoryEmailVerified: true,
    },
  });

  return true;
};
