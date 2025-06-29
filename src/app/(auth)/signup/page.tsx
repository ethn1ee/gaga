"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form as FormComponent } from "@/components/ui/form";
import { useAuth } from "@/hooks";
import { authClient } from "@/lib/auth";
import { signUpInput, type SignUpInput } from "@/lib/schema";
import { getNow } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Email, Name, Password, Username } from "../_form";

const REDIRECT_PATH = "/";

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();

  // redirect if already signed in
  useEffect(() => {
    if (session) {
      router.push(REDIRECT_PATH);
    }
  }, [session, router]);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpInput),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: SignUpInput) => {
    setIsLoading(true);
    const { data, error } = await authClient.signUp.email({ ...values });

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
    <main className="h-[calc(100svh-84px-80px)] w-full mt-0 flex items-center justify-center">
      <div className="flex flex-col gap-6 w-4xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <FormComponent {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
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
                      isLoading || !!signUpInput.safeParse(form.watch()).error
                    }
                    className="w-full"
                  >
                    {isLoading ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </FormComponent>

            <div className="bg-muted relative">
              <Image
                src="/placeholder.svg"
                alt="Image"
                fill
                className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <Link href="#">Terms of Service</Link> and{" "}
          <Link href="#">Privacy Policy</Link>.
        </div>
      </div>
    </main>
  );
};

export default SignUp;
