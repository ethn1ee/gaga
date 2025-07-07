"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Actions = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient
      .signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully signed out!", {
              position: "top-center",
            });
          },
        },
      })
      .finally(() => router.push("/"));
  };

  return (
    <section className="*:w-full space-y-2">
      <Button variant="secondary" onClick={handleSignOut}>
        Sign Out
      </Button>
      <Button variant="destructive">Delete Account</Button>
    </section>
  );
};

export default Actions;
