"use client";

import { EmailPasswordForm } from "@/components/auth/form";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth";
import { signUpInput } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod/v4";
import { type FormProps } from "../page";

const schema = signUpInput.pick({
  email: true,
  name: true,
  password: true,
  password2: true,
});

const BasicInformationForm = ({ setStep, setUserData }: FormProps) => {
  const t = useTranslations("auth");

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      password2: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    await authClient.signUp.email(
      { ...values },
      {
        onSuccess: () => {
          setUserData({ ...values });
          setStep((prev) => prev + 1);
        },
        onError: ({ error }) => {
          let message: string;
          let description: string;
          switch (error.code) {
            case "USER_ALREADY_EXISTS":
              message = t("toast.user-already-exists.message");
              description = t("toast.user-already-exists.description");
              break;
            default:
              message = "toast.unknown-error.message";
              description = "toast.unknown-error.description";
              console.error("Error signing up:", error);
          }

          toast.error(message, {
            position: "top-center",
            description,
          });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 w-full *:w-full"
      >
        <EmailPasswordForm isSignUp />

        <LoadingButton
          type="submit"
          disabled={
            Object.entries(form.formState.errors).length > 0 ||
            !form.formState.isValid ||
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

export default BasicInformationForm;
