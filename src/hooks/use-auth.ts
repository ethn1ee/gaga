"use client";

import { AuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type UseAuthProps = {
  protect?: boolean;
  redirectTo?: string;
};

const useAuth = ({ protect = true, redirectTo = "/" }: UseAuthProps = {}) => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const router = useRouter();
  const { session, isSessionLoading } = context;
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && protect && !isSessionLoading && !session) {
      toast.info("You need to log in first", {
        position: "top-center",
      });
      router.push(redirectTo);
    }
  }, [router, session, isSessionLoading, protect, redirectTo, hasMounted]);

  return context;
};

export default useAuth;
