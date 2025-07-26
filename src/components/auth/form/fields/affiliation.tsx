"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type SignUpInput, signUpInput } from "@/lib/schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

const AffiliationFormField = () => {
  const t = useTranslations("auth.inputs.affiliation");
  const form =
    useFormContext<Pick<SignUpInput, "affiliation" | "class" | "emoryEmail">>();

  return (
    <FormField
      control={form.control}
      name="affiliation"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="affiliation">{t("label")}</FormLabel>
          <FormControl>
            <Select
              value={field.value as string}
              onValueChange={(val) => {
                if (val === "none") {
                  form.setValue("class", null);
                  form.setValue("emoryEmail", null);
                }
                field.onChange(val);
              }}
            >
              <FormControl>
                <SelectTrigger className="bg-transparent! w-full">
                  <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(signUpInput.shape.affiliation.enum).map(
                  (value) => (
                    <SelectItem key={value} value={value}>
                      {t(`values.${value}`)}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
              <FormMessage />
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AffiliationFormField;
