"use client";

import { FormField } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { type SignUpInput } from "@/lib/schema";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useFormContext } from "react-hook-form";

const OTPFormField = () => {
  const form = useFormContext<Pick<SignUpInput, "otp">>();

  return (
    <FormField
      name="otp"
      control={form.control}
      render={({ field }) => (
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          value={field.value}
          onChange={field.onChange}
        >
          <InputOTPGroup className="*:!bg-transparent w-fit *:size-12 mx-auto">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )}
    />
  );
};

export default OTPFormField;
