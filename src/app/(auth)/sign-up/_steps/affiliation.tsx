"use client";

import { AffiliationForm } from "@/components/auth/form";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { sendAffiliationVerification } from "@/lib/auth";
import { signUpInput } from "@/lib/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      emoryEmail: "",
      affiliation: "None",
    },
  });

  const updateAffiliation = api.user.update.useMutation({
    onSuccess: async (data) => {
      const { error } = await sendAffiliationVerification({
        userId: data.id,
        name: data.name,
        emoryEmail: data.emoryEmail!,
      });

      if (error) {
        toast.error("Failed to send verification email!", {
          description: "Please try again later",
          position: "top-center",
        });
        console.error(error);
      } else {
        toast.success("Verification Email sent!", {
          description:
            "Check your Emory email inbox to verify your affiliation",
          position: "top-center",
        });
      }
      setStep((prev) => prev + 1);
    },
    onError: (error) => {
      toast.error("Failed to update affiliation!", {
        description: "Please try again later",
        position: "top-center",
      });
      console.error("Error updating affiliation", error);
    },
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
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
            form.formState.isSubmitting
          }
          isLoading={form.formState.isSubmitting}
          className="w-full"
        >
          Continue
        </LoadingButton>
      </form>
    </Form>
  );
};

export default Affiliation;
