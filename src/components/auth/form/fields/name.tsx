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
import { useFormContext } from "react-hook-form";

const NameFormField = () => {
  const t = useTranslations("auth.inputs.name");
  const form = useFormContext<Pick<SignUpInput, "name">>();

  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="name">{t("label")}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="John Doe"
              className="clear-input-style h-10 !ring ring-border"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NameFormField;
