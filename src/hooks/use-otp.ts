"use client";

import { authClient } from "@/lib/auth";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useAuth from "./use-auth";

type UseOTPProps = {
  email: string;
};

const COOLDOWN_SECONDS = 60;

const useOTP = ({ email }: UseOTPProps) => {
  const t = useTranslations("auth.toast");
  const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS);
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const sent = useRef(false);

  const { refresh } = useAuth();

  useEffect(() => {
    if (cooldown === 0) {
      sent.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const sendOTP = useCallback(async () => {
    if (sent.current) return;
    sent.current = true;

    await authClient.emailOtp
      .sendVerificationOtp(
        {
          email,
          type: "email-verification",
        },
        {
          onSuccess: () => {
            toast.success(t("send-otp.success.message"), {
              position: "top-center",
              description: email,
            });
          },
          onError: ({ error }) => {
            toast.error(t("send-otp.error.message"), {
              position: "top-center",
              description: t("send-otp.error.description"),
            });
            console.error("Error sending OTP", error);
          },
        },
      )
      .finally(() => setCooldown(COOLDOWN_SECONDS));
  }, [email, t]);

  const verifyOTP = async (otp: string) => {
    setIsVerificationLoading(true);
    const { error } = await authClient.emailOtp
      .verifyEmail(
        {
          email,
          otp,
        },
        {
          onSuccess: async () => {
            toast.success(t("verify-otp.success.message"), {
              position: "top-center",
              description: email,
            });
            await refresh();
          },
          onError: ({ error }) => {
            let message: string;
            let description: string;
            switch (error.code) {
              case "INVALID_OTP":
                message = t("verify-otp.error.message");
                description = t("verify-otp.error.description");
                break;
              default:
                message = t("unknown-error.message");
                description = t("unknown-error.description");
                console.error("Error verifying OTP:", error);
            }

            toast.error(message, {
              position: "top-center",
              description,
            });
          },
        },
      )
      .finally(() => setIsVerificationLoading(false));

    return !error;
  };

  return { sendOTP, verifyOTP, cooldown, isVerificationLoading };
};

export default useOTP;
