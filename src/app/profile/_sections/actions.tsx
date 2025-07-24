"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Actions = () => {
  const t = useTranslations("profile.sections.actions");
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
        {t("sign-out")}
      </Button>
      <Button variant="destructive">{t("delete-account")}</Button>
    </section>
  );
};

export default Actions;
