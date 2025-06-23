import { z } from "zod";

const signUpInput = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8).max(100),
  username: z.string().min(3).max(100),
});

type SignUpInput = z.infer<typeof signUpInput>;

const signInInput = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(8).max(100),
});

type SignInInput = z.infer<typeof signInInput>;

export { signInInput, signUpInput, type SignInInput, type SignUpInput };
