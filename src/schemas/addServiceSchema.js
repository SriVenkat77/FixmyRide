import * as z from 'zod';

const addServiceSchema = z.object({
    name: z
        .string()
        .min(5, { message: 'Name must be at least 5 characters long' })
        .max(64, { message: 'Name must not exceed 64 characters' })
        .nonempty({ message: 'Name is required' }),
    description: z
        .string()
        .min(5, { message: 'Description must be at least 5 characters long' })
        .max(256, { message: 'Description must not exceed 256 characters' })
        .nonempty({ message: 'Description is required' }),
    price: z
        .string()
        .nonempty({ message: 'Price is required' }),
});

export default addServiceSchema;
