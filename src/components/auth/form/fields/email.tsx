"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SignUpInput } from "@/lib/schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type EmailFormFieldProps = {
  isSignUp?: boolean;
};

const EmailFormField = ({ isSignUp = false }: EmailFormFieldProps) => {
  const t = useTranslations("auth.inputs.email");
  const form = useFormContext<Pick<SignUpInput, "email">>();

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="email">
            {t("label", { isSignUp: isSignUp.toString() })}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="john.doe@gmail.com"
              className="clear-input-style h-10 !ring ring-border"
            />
          </FormControl>
          <FormMessage />
          {isSignUp && <FormDescription>{t("description")}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

export default EmailFormField;
