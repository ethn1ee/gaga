import { z } from "zod/v4";

const signUpInput = z
  .object({
    email: z.email(),
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be at most 100 characters"),
    password2: z.string().min(1, "Passwords must match"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(100, "Username must be at most 100 characters"),
    affiliation: z.enum([
      "None",
      "Student",
      "Alumni",
      "Mom",
      "Dad",
      "Sibling",
      "Other",
    ]),
  })
  .refine(
    ({ password, password2 }) => password === password2,
    "Passwords must match",
  );

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
