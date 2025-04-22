import { z } from 'zod';

export const TaxSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: 'Name must be 3 or more characters long' })
    .max(80, { message: 'Name must be 80 or fewer characters long' }),
  description: z
    .string()
    .min(3, { message: 'Description must be 3 or more characters long' })
    .max(250, { message: 'Description must be 250 or fewer characters long' }),
  percentage: z
    .number()
    .min(0, { message: 'Percentage must be a positive number' })
    .max(100, { message: 'Percentage must be less than or equal to 100' }),
  idCategory: z.string(),
});

export type Tax = z.infer<typeof TaxSchema>;
