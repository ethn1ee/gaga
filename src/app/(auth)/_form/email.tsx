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
import { useFormContext } from "react-hook-form";

const Email = () => {
  const form = useFormContext<SignInInput | SignUpInput>();

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem className="grid gap-3">
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormControl>
            <Input {...field} placeholder="john.doe@emory.edu" required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Email;
