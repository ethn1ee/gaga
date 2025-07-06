"use client";

import { authClient } from "@/lib/auth";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

type AuthContextType = {
  session: ReturnType<typeof authClient.useSession>["data"];
  isSessionLoading: ReturnType<typeof authClient.useSession>["isPending"];
  error: ReturnType<typeof authClient.useSession>["error"];
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, isPending, error } = authClient.useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && error) {
      toast.error("There was an error fetching your session", {
        description: "Please try again later",
        position: "top-center",
      });
      console.error("Error fetching session:", error);
    }
  }, [error, isMounted]);

  const value: AuthContextType = {
    session: isMounted ? session : null,
    isSessionLoading: isMounted ? isPending : true,
    error: isMounted ? error : null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
