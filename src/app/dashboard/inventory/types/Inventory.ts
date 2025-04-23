import { maxInteger } from '@/utils/maxValues';
import { z } from 'zod';

export const InventorySchema = z.object({
  id: z.string().optional(),
  dateOrder: z.string().date(),
  quantity: z
    .number()
    .min(0, { message: 'Percentage must be a positive number' })
    .max(maxInteger, {
      message: 'Percentage must be less than or equal to ' + maxInteger,
    }),
  idProduct: z.string(),
});

export type Inventory = z.infer<typeof InventorySchema>;
