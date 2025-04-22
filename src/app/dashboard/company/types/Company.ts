import { z } from 'zod';

export const CompanySchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: 'Name must be 3 or more characters long' })
    .max(80, { message: 'Name must be 80 or fewer characters long' }),
  docId: z
    .string()
    .min(3, { message: 'Description must be 3 or more characters long' })
    .max(80, {
      message: 'Description must be 80 or fewer characters long',
    }),
  email: z
    .string()
    .min(3, { message: 'Short description must be 3 or more characters long' })
    .max(250, {
      message: 'Short description must be 250 or fewer characters long',
    }),
  description: z
    .string()
    .min(3, { message: 'Short description must be 3 or more characters long' })
    .max(250, {
      message: 'Short description must be 250 or fewer characters long',
    }),
  phoneNumber: z
    .string()
    .min(3, { message: 'Short description must be 3 or more characters long' })
    .max(80, {
      message: 'Short description must be 80 or fewer characters long',
    }),
  companyAddress: z.object({
    street: z
      .string()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(80, { message: 'Name must be 80 or fewer characters long' }),
    number: z
      .string()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(80, { message: 'Name must be 80 or fewer characters long' }),
    complement: z
      .string()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(80, { message: 'Name must be 80 or fewer characters long' }),
    neighborhood: z
      .string()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(80, { message: 'Name must be 80 or fewer characters long' }),
    district: z
      .string()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(80, { message: 'Name must be 80 or fewer characters long' }),
    city: z
      .string()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(80, { message: 'Name must be 80 or fewer characters long' }),
    country: z
      .string()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(80, { message: 'Name must be 80 or fewer characters long' }),
    zipCode: z
      .string()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(80, { message: 'Name must be 80 or fewer characters long' }),
    latitude: z
      .string()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(80, { message: 'Name must be 80 or fewer characters long' }),
    longitude: z
      .string()
      .min(3, { message: 'Name must be 3 or more characters long' })
      .max(80, { message: 'Name must be 80 or fewer characters long' }),
  }),
});

export type Company = z.infer<typeof CompanySchema>;
