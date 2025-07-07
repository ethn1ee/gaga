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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUpInput, type SignUpInput } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

const Email = () => {
  const form = useFormContext<SignUpInput>();

  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder="john.doe@example.com" required />
            </FormControl>
            <FormDescription>
              Enter Emory email if you are an affiliate
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("email").endsWith("emory.edu") && (
        <FormField
          control={form.control}
          name="affiliation"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel htmlFor="affiliation">Affiliation</FormLabel>
              <FormControl>
                <Select defaultValue="" onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your Emory affiliation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(signUpInput.shape.affiliation.enum)
                      .filter((val) => val !== "None")
                      .map((value) => (
                        <SelectItem key={value} value={value}>
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </SelectItem>
                      ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormControl>
              <FormDescription>
                You entered an Emory email address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default Email;
