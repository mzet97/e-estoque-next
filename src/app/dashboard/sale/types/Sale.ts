import { maxDecimal } from '@/utils/maxValues';
import { z } from 'zod';
import { CustomerSchema } from '../../customer/types/Customer';
import { ProductSchema } from '../../product/types/Product';

export const SaleSchema = z.object({
    id: z.string().optional(),
    quantity: z.number().min(0, { message: 'Quantity must be 0 or greater' }),
    totalPrice: z
        .number()
        .min(0, { message: 'Total price must be 0 or greater' })
        .max(maxDecimal, { message: 'Total price must be less than ' + maxDecimal }),
    totalTax: z
        .number()
        .min(0, { message: 'Total tax must be 0 or greater' })
        .max(maxDecimal, { message: 'Total tax must be less than ' + maxDecimal }),
    saleType: z.string(),
    paymentType: z.string(),
    deliveryDate: z.string().optional().nullable(),
    saleDate: z.string(),
    paymentDate: z.string().optional().nullable(),
    idCustomer: z.string(),
    customer: CustomerSchema.optional().nullable(),
    products: z.array(ProductSchema),
    createdAt: z.string(),
    updatedAt: z.string().optional().nullable(),
    deletedAt: z.string().optional().nullable(),
});

export type Sale = z.infer<typeof SaleSchema>;
