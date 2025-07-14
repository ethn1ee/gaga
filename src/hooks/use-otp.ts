"use client";

import { authClient } from "@/lib/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useAuth from "./use-auth";

type UseOTPProps = {
  email: string;
};

const COOLDOWN_SECONDS = 60;

const useOTP = ({ email }: UseOTPProps) => {
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
            toast.success("Verification email sent!", {
              position: "top-center",
              description: email,
            });
          },
          onError: ({ error }) => {
            toast.error("Failed to send verification email!", {
              position: "top-center",
              description: "Please try again later.",
            });
            console.error("Error sending OTP", error);
          },
        },
      )
      .finally(() => setCooldown(COOLDOWN_SECONDS));
  }, [email]);

  const verifyOTP = async (otp: string) => {
    setIsVerificationLoading(true);
    const { error } = await authClient.emailOtp
      .verifyEmail(
        {
          email,
          otp,
        },
        {
          onSuccess: () => {
            toast.success("Email verified!", {
              position: "top-center",
              description: email,
            });
            refresh();
          },
          onError: ({ error }) => {
            let message: string;
            let description: string;
            switch (error.code) {
              case "INVALID_OTP":
                message = "Invalid code!";
                description = "Try again.";
                break;
              default:
                message = "Unknown error occurred";
                description = "Please try again later.";
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
