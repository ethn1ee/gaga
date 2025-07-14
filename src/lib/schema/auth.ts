import { z } from "zod/v4";
import { user } from "./user";

const signUpInput = z
  .object({
    name: user.shape.name,
    email: user.shape.email,
    password: user.shape.password,
    password2: z.string(),
    otp: z.string().length(6),
    affiliation: user.shape.affiliation,
    emoryEmail: user.shape.emoryEmail,
    class: user.shape.class,
  })
  .refine(
    ({ password, password2 }) => password === password2,
    "Passwords do not match",
  );

type SignUpInput = z.infer<typeof signUpInput>;

const signInInput = signUpInput.pick({ email: true, password: true });

type SignInInput = z.infer<typeof signInInput>;

export { signInInput, signUpInput, type SignInInput, type SignUpInput };
