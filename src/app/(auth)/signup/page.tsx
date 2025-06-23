"use client";

import { Button } from "@/components/ui/button";
import {
  Form as FormComponent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth";
import { signUpInput, type SignUpInput } from "@/lib/schema";
import { getNow } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpInput),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
  });

  const handleSubmit = async (values: SignUpInput) => {
    await authClient.signUp
      .email(
        { ...values, callbackURL: "/" },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            setIsLoading(false);
            toast.success(`Welcome!`, {
              position: "top-center",
              description: getNow(),
            });
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error("Failed to sign up!", {
              position: "top-center",
              description: "Please try again later",
            });
            console.error(ctx.error);
          },
        },
      )
      .finally(() => router.push("/"));
  };

  return (
    <main>
      <FormProvider {...form}>
        <FormComponent {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mb-4 flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@emory.edu"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Minimum 4 characters"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Minimum 8 characters"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Minimum 2 characters"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="lg"
              type="submit"
              disabled={
                isLoading || !!signUpInput.safeParse(form.watch()).error
              }
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Submit"}
            </Button>
          </form>
        </FormComponent>
      </FormProvider>
    </main>
  );
};

export default SignUp;
