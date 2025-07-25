"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SignUpInput } from "@/lib/schema";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const Password2FormField = () => {
  const t = useTranslations("auth.inputs.password2");
  const form = useFormContext<Pick<SignUpInput, "password" | "password2">>();

  useEffect(() => {
    if (form.getFieldState("password2").error) return;
    if (form.watch("password") !== form.watch("password2"))
      form.setError("password2", { message: "Passwords do not match" });
  }, [form]);

  return (
    <FormField
      control={form.control}
      name="password2"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            <FormLabel htmlFor="password">{t("label")}</FormLabel>
          </div>
          <FormControl>
            <Input
              {...field}
              placeholder="········"
              type="password"
              className="clear-input-style h-10 !ring ring-border"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Password2FormField;
