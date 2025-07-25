"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
      <DeleteAccount />
    </section>
  );
};

export default Actions;

const DeleteAccount = () => {
  const t = useTranslations("profile.sections.actions.delete-account");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    await authClient.deleteUser();
    setIsLoading(false);
    router.replace("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{t("button")}</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialog.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("dialog.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("dialog.buttons.cancel")}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton isLoading={isLoading} onClick={handleDeleteAccount}>
              {t("dialog.buttons.delete")}
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
