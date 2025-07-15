"use server";

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
  const result = await api.verification.create(identifier);

  return await sendEmail({
    to: emoryEmail,
    subject: "Verify Emory Affiliation for EmoryLife",
    text: `Click the following link to verify Emory affiliation for ${name}:\n\nhttps://emorylife.net/verify-affiliation?id=${result.id}&token=${result.value}`,
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
