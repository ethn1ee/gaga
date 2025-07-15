"use client";

import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

type RequireAuthOptions = {
  redirectTo?: string;
  message?: string;
  showToast?: boolean;
};

const useRequireAuth = (options: RequireAuthOptions = {}) => {
  const {
    redirectTo = "/sign-in",
    message = "You need to log in first!",
    showToast = true,
  } = options;

  const { session, isSessionLoading } = useAuth();
  const router = useRouter();

  const requireAuth = useCallback(
    async (action?: () => void | Promise<void>) => {
      if (isSessionLoading) return false;

      if (!session) {
        if (showToast) {
          toast.error(message, {
            position: "top-center",
          });
        }
        router.push(redirectTo);
        return false;
      }

      // User is authenticated, execute the optional action
      await action?.();
      return true;
    },
    [session, isSessionLoading, router, redirectTo, message, showToast],
  );

  return requireAuth;
};

export default useRequireAuth;
