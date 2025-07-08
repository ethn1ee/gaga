"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SignInInput, type SignUpInput } from "@/lib/schema";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

type PasswordProps = {
  isSignUp?: boolean;
};

const Password = ({ isSignUp = false }: PasswordProps) => {
  const form = useFormContext<SignInInput | SignUpInput>();

  return (
    <>
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center">
              <FormLabel htmlFor="password">Password</FormLabel>
              {!isSignUp && (
                <Link
                  href="#"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Forgot your password?
                </Link>
              )}
            </div>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter your password"
                type="password"
                className="clear-input-style h-10 !ring ring-border"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isSignUp && (
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel htmlFor="password">Confirm Password</FormLabel>
                {!isSignUp && (
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Confirm your password"
                  type="password"
                  className="clear-input-style h-10 !ring ring-border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default Password;
