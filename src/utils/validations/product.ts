import { z } from "zod";

export const productSchemaZod = z
  .object({
    title: z.string().nonempty("Title is required").optional(),
    description: z.string().optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    medias: z
      .array(z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"))
      .optional(),
  })
  .strict();
