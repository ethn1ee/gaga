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
import { useFormContext } from "react-hook-form";

const AffiliationFormField = () => {
  const form =
    useFormContext<Pick<SignUpInput, "affiliation" | "class" | "emoryEmail">>();

  return (
    <FormField
      control={form.control}
      name="affiliation"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="affiliation">Emory Affiliation</FormLabel>
          <FormControl>
            <Select
              value={field.value as string}
              onValueChange={(val) => {
                if (val === "None") {
                  form.setValue("class", null);
                  form.setValue("emoryEmail", null);
                }
                field.onChange(val);
              }}
            >
              <FormControl>
                <SelectTrigger className="clear-input-style h-10 !ring ring-border w-full">
                  <SelectValue placeholder="Select your Emory affiliation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(signUpInput.shape.affiliation.enum).map(
                  (value) => (
                    <SelectItem key={value} value={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
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
