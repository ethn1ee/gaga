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
import { useAuth } from "@/hooks";
import { authClient } from "@/lib/auth";
import { signInInput, type SignInInput } from "@/lib/schema";
import { getNow } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const REDIRECT_PATH = "/";

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();

  // redirect if already signed in
  useEffect(() => {
    if (session) {
      toast.info("Already signed in!", {
        position: "top-center",
      });
      router.push(REDIRECT_PATH);
    }
  }, [session, router]);

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInInput),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: SignInInput) => {
    setIsLoading(true);
    const { data, error } = await authClient.signIn.username({ ...values });

    if (!error) {
      setIsLoading(false);
      toast.success(`Welcome, ${data.user.name.split(" ")[0]}`, {
        position: "top-center",
        description: getNow(),
      });
      router.push(REDIRECT_PATH);
    } else {
      setIsLoading(false);
      let message = "Please try again later";
      if (error.code === "INVALID_USERNAME_OR_PASSWORD") {
        message = "Invalid username or password";
      }

      toast.error("Failed to sign in!", {
        position: "top-center",
        description: message,
      });
      console.error(error);
    }
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Username" className="" />
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
                      type="password"
                      placeholder="Minimum 8 characters"
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
                isLoading || !!signInInput.safeParse(form.watch()).error
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
