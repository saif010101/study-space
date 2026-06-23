import zod from 'zod';

export const registerFormSchema = zod.object({
    username: zod
        .string()
        .toLowerCase()
        .regex(/^[a-z0-9]{5,20}$/),
    display_name: zod
        .string()
        .toLowerCase()
        .regex(/^[a-z]{5,50}$/),
    email: zod
        .string()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/),
});