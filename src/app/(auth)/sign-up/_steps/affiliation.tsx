"use client";

import { AffiliationForm } from "@/components/auth/form";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { sendAffiliationVerification } from "@/lib/auth";
import { signUpInput } from "@/lib/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod/v4";
import { type FormProps } from "../page";

const schema = signUpInput.pick({
  emoryEmail: true,
  affiliation: true,
  class: true,
});

const Affiliation = ({ userData, setStep }: FormProps) => {
  const t = useTranslations("auth");

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      emoryEmail: "",
      affiliation: "none",
    },
  });

  const updateAffiliation = api.user.update.useMutation({
    onSuccess: async (data) => {
      if (!data.emoryEmail) return;

      const { error } = await sendAffiliationVerification({
        userId: data.id,
        name: data.name,
        emoryEmail: data.emoryEmail,
      });

      if (error) {
        toast.error(t("toast.send-affiliation-verification.error.message"), {
          description: t(
            "toast.send-affiliation-verification.error.description",
          ),
          position: "top-center",
        });
        console.error(error);
      } else {
        toast.success(
          t("toast.send-affiliation-verification.success.message"),
          {
            description: data.emoryEmail,
            position: "top-center",
          },
        );
      }
      setStep((prev) => prev + 1);
    },
    onError: (error) => {
      toast.error(t("toast.unknown-error.message"), {
        description: t("toast.unknown-error.description"),
        position: "top-center",
      });
      console.error("Error updating affiliation:", error);
    },
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values);
    await updateAffiliation.mutateAsync({
      email: userData.email,
      data: { ...values },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 w-full *:w-full"
      >
        <AffiliationForm />

        <LoadingButton
          type="submit"
          disabled={
            Object.entries(form.formState.errors).length > 0 ||
            form.formState.isValid ||
            form.formState.isSubmitting
          }
          isLoading={form.formState.isSubmitting}
          className="w-full"
        >
          {t("buttons.continue")}
        </LoadingButton>
      </form>
    </Form>
  );
};

export default Affiliation;
