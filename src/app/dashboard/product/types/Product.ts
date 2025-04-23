import { maxDecimal } from '@/utils/maxValues';
import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: 'Name must be 3 or more characters long' })
    .max(250, { message: 'Name must be 250 or fewer characters long' }),
  description: z
    .string()
    .min(3, { message: 'Description must be 3 or more characters long' })
    .max(500, {
      message: 'Description must be 500 or fewer characters long',
    }),
  shortDescription: z
    .string()
    .min(3, { message: 'Short description must be 3 or more characters long' })
    .max(250, {
      message: 'Short description must be 250 or fewer characters long',
    }),
  price: z
    .number()
    .min(1, { message: 'Price must be greater than 0' })
    .max(maxDecimal, { message: 'Price must be less than ' + maxDecimal }),
  weight: z
    .number()
    .min(1, { message: 'Weight must be greater than 0' })
    .max(maxDecimal, { message: 'Weight must be less than ' + maxDecimal }),
  height: z
    .number()
    .min(1, { message: 'Height must be greater than 0' })
    .max(maxDecimal, { message: 'Height must be less than ' + maxDecimal }),
  length: z
    .number()
    .min(1, { message: 'Height must be greater than 0' })
    .max(maxDecimal, { message: 'Height must be less than ' + maxDecimal }),
  image: z.string().optional(),
  idCategory: z.string(),
  idCompany: z.string(),
  isDeleted: z.boolean().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
