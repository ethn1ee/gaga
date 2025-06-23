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

const Username = () => {
  const form = useFormContext<SignInInput | SignUpInput>();

  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem className="grid gap-3">
          <FormLabel htmlFor="email">Username</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Enter your username" required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Username;
