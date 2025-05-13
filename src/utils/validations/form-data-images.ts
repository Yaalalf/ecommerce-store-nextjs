import { z } from "zod";

const imageSchema = z.instanceof(File).refine(
  (file) => {
    return file.type.startsWith("image/");
  },
  {
    message: "Only Accept images",
  }
);
export const formDataSchema = z.object({
  images: imageSchema.or(z.array(imageSchema)),
});
export type FormDataSchema = z.infer<typeof formDataSchema>;
