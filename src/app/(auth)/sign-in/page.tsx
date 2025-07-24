"use client";

import { EmailPasswordForm } from "@/components/auth/form";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth";
import { signInInput, type SignInInput } from "@/lib/schema";
import { getNow } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectUrl = searchParams.get("next") ?? "/";

  const form = useForm({
    resolver: zodResolver(signInInput),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: SignInInput) => {
    await authClient.signIn.email({
      ...values,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Welcome back!", {
            position: "top-center",
            description: getNow(),
          });
          window.location.href = redirectUrl;
        },
        onError: ({ error }) => {
          let message: string;
          let description: string | undefined;
          switch (error.code) {
            case "INVALID_EMAIL_OR_PASSWORD":
              message = "Invalid username or password";
              break;
            case "EMAIL_NOT_VERIFIED":
              message = "Verify your email to sign in";
              router.push(`/verify-email?email=${values.email}`);
              break;
            default:
              message = "Unknown error occurred";
              description = "Please try again later.";
              console.error("Error signing in:", error);
          }

          toast.error(message, {
            position: "top-center",
            description,
          });
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 w-full max-w-lg"
      >
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{t("sign-in.title")}</h1>
          <p className="text-muted-foreground text-balance">
            {t("sign-in.subtitle")}
          </p>
        </div>

        <EmailPasswordForm />

        <LoadingButton
          type="submit"
          disabled={
            form.formState.isSubmitting ||
            !!signInInput.safeParse(form.watch()).error
          }
          isLoading={form.formState.isSubmitting}
          className="w-full"
        >
          {t("buttons.sign-in")}
        </LoadingButton>

        <div className="text-center text-sm">
          {t("sign-in.sign-up-instead.message")}{" "}
          <Link
            href="/sign-up"
            className="underline underline-offset-4 font-medium text-primary"
          >
            {t("sign-in.sign-up-instead.button")}
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignIn;
