"use client";

import { OTPFormField } from "@/components/auth/form/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useOTP } from "@/hooks";
import { signUpInput } from "@/lib/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

const formSchema = z.object({
  otp: signUpInput.shape.otp,
});

type OTPForm = z.infer<typeof formSchema>;

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  useEffect(() => {
    if (!email) router.replace("/");
  }, [email, router]);

  if (!email) return null;
  return <VerificationForm email={email} />;
};

export default VerifyEmail;

type VerificationFormProps = {
  email: string;
};

const VerificationForm = ({ email }: VerificationFormProps) => {
  const { sendOTP, verifyOTP, cooldown } = useOTP({ email });
  const { data, isLoading: isUserLoading } =
    api.user.getByEmail.useQuery(email);
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) return;
    if (!data || data.emailVerified) {
      router.replace("/");
      return;
    }

    void sendOTP();
  }, [isUserLoading, data, router, sendOTP]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: OTPForm) => {
    const success = await verifyOTP(values.otp);
    if (success) router.push("/");
  };

  return isUserLoading ? (
    <div className="size-full flex items-center justify-center">
      <Loader2Icon className="animate-spin text-muted-foreground" />
    </div>
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 w-full max-w-lg"
      >
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <p className="text-muted-foreground text-balance">
            Verification code has been sent to {email}
          </p>
        </div>

        <div className="flex justify-between h-max">
          <OTPFormField />

          <Button
            type="button"
            onClick={sendOTP}
            disabled={cooldown > 0}
            variant="secondary"
            size="lg"
            className="h-12"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
          </Button>
        </div>

        <Button
          type="submit"
          disabled={
            form.formState.isSubmitting ||
            !formSchema.safeParse(form.watch()).success
          }
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
};
