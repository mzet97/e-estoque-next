import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be 2 or more characters long" }),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;