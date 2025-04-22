import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string()
    .min(3, { message: "Name must be 3 or more characters long" })
    .max(80, { message: "Name must be 80 or fewer characters long" }),
  description: z.string()
  .min(3, { message: "Description must be 3 or more characters long" })
  .max(5000, { message: "Description must be 5000 or fewer characters long" }),
  shortDescription: z.string()
  .min(3, { message: "Short description must be 3 or more characters long" })
  .max(500, { message: "Short description must be 500 or fewer characters long" }),
});

export type Category = z.infer<typeof CategorySchema>;