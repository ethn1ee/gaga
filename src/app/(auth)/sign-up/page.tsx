"use client";

import { Button } from "@/components/ui/button";
import { Form as FormComponent } from "@/components/ui/form";
import { authClient } from "@/lib/auth";
import { signUpInput, type SignUpInput } from "@/lib/schema";
import { getNow } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Email from "../_form/email";
import Name from "../_form/name";
import Password from "../_form/password";
import Username from "../_form/username";

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("next") ?? "/";

  const form = useForm({
    resolver: zodResolver(signUpInput),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
      name: "",
      username: "",
      affiliation: "None" as SignUpInput["affiliation"],
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: SignUpInput) => {
    await authClient.signUp.email({
      ...values,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Welcome!", {
            position: "top-center",
            description: getNow(),
          });
          router.push(redirectUrl);
        },
        onError: ({ error }) => {
          let message = "Please try again later";
          if (error.code === "INVALID_USERNAME_OR_PASSWORD") {
            message = "Invalid username or password";
          }

          toast.error("Failed to sign in!", {
            position: "top-center",
            description: message,
          });
          console.error(error);
        },
      },
    });
  };

  return (
    <FormComponent {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 w-full max-w-lg"
      >
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="text-muted-foreground text-balance">
            Create your EmoryLife account
          </p>
        </div>

        <Name />
        <Email />
        <Username />
        <Password isSignUp />

        <Button
          type="submit"
          disabled={
            form.formState.isSubmitting ||
            !!signUpInput.safeParse(form.watch()).error
          }
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Sign Up"
          )}
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="underline underline-offset-4 font-medium text-primary"
          >
            Sign in
          </Link>
        </div>
      </form>
    </FormComponent>
  );
};

export default SignUp;
