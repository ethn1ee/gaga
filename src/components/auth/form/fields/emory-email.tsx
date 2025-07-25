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

const EmoryEmailFormField = () => {
  const t = useTranslations("auth.inputs.emory-email");
  const form = useFormContext<Pick<SignUpInput, "emoryEmail">>();

  return (
    <FormField
      control={form.control}
      name="emoryEmail"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="emoryEmail">{t("label")}</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={field.value ?? ""}
              placeholder="john.doe@emory.edu"
              className="clear-input-style h-10 !ring ring-border"
            />
          </FormControl>
          <FormDescription>{t("description")}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmoryEmailFormField;
