import { z } from "zod";

export const resourcesSchemaZod = z
  .object({
    name: z.string().nonempty("name is required").optional(),
    size: z.number().positive("Price must be a positive number").optional(),
  })
  .strict();
