import { z } from "zod/v4";

const MIN_CLASS = 1836;
const MAX_CLASS = new Date().getFullYear() + 4;

const user = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z
    .email()
    .refine((val) => !val.endsWith("emory.edu"), "Must not be an Emory email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 100 characters"),
  affiliation: z.enum([
    "None",
    "Student",
    "Alumni",
    "Mom",
    "Dad",
    "Sibling",
    "Other",
  ]),
  emoryEmail: z
    .email()
    .refine((val) => val.endsWith("emory.edu"), "Must be an Emory email")
    .nullable()
    .optional(),
  class: z
    .number()
    .refine(
      (val) => val >= MIN_CLASS && val <= MAX_CLASS,
      `Class must be between ${MIN_CLASS} and ${MAX_CLASS}`,
    )
    .nullable()
    .optional(),
  image: z.url().nullable().optional(),
});

type User = z.infer<typeof user>;

export { user, type User };
