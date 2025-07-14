"use client";

import { OTPFormField } from "@/components/auth/form/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useOTP } from "@/hooks";
import { signUpInput } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod/v4";
import { type FormProps } from "../page";

const schema = signUpInput.pick({
  otp: true,
});

const EmailVerificationForm = ({ userData, setStep }: FormProps) => {
  const { sendOTP, verifyOTP, cooldown } = useOTP({
    email: userData.email,
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    void sendOTP();
  }, [sendOTP]);

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    const success = await verifyOTP(values.otp);
    if (success) setStep((prev) => prev + 1);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 w-full *:w-full"
      >
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
            Object.entries(form.formState.errors).length > 0 ||
            form.formState.isSubmitting
          }
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EmailVerificationForm;
