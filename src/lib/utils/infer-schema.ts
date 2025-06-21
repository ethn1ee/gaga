import type { z } from "zod";

export const inferSchema = <T>(schema: z.ZodType<T>) => {
  
  return schema;
};
