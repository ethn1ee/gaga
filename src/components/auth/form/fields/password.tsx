"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { type SignUpInput } from "@/lib/schema";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import zxcvbn from "zxcvbn";

type PasswordFormFieldProps = {
  isSignUp?: boolean;
};

const PasswordFormField = ({ isSignUp = false }: PasswordFormFieldProps) => {
  const form = useFormContext<Pick<SignUpInput, "password">>();
  const password = form.watch("password");
  const { score } = zxcvbn(password);

  useEffect(() => {
    if (!isSignUp || form.getFieldState("password").error) return;
    if (form.getFieldState("password").isDirty && score < 3) {
      form.setError("password", { message: "Password is too weak" });
    }
  }, [form, score, isSignUp]);

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            <FormLabel htmlFor="password">Password</FormLabel>
          </div>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter your password"
              type="password"
              className="clear-input-style h-10 !ring ring-border"
            />
          </FormControl>
          {isSignUp && <Progress value={score * 25} className="h-1" />}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordFormField;
