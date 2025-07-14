"use client";

import { AffiliationForm } from "@/components/auth/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUpInput } from "@/lib/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
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
    onSuccess: () => {
      toast.success("Welcome!", {
        position: "top-center",
      });
      setStep((prev) => prev + 1);
    },
    onError: (error) => {
      toast.error("Failed to update affiliation!", {
        position: "top-center",
        description: "Please try again later",
      });
      console.error("Error updating affiliation", error);
    },
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    updateAffiliation.mutate({
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

export default Affiliation;
