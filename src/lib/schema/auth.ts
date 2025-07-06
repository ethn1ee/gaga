import { z } from "zod";

const signUpInput = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("emory.edu"), {
      message: "Email must end with emory.edu",
    }),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 100 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(100, "Username must be at most 100 characters"),
});

type SignUpInput = z.infer<typeof signUpInput>;

const signInInput = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(100, "Username must be at most 100 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 100 characters"),
});

type SignInInput = z.infer<typeof signInInput>;

export { signInInput, signUpInput, type SignInInput, type SignUpInput };
