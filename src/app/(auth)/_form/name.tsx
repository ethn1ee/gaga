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

const Name = () => {
  const form = useFormContext<SignInInput | SignUpInput>();

  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="grid gap-3">
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormControl>
            <Input {...field} placeholder="John Doe" required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Name;
