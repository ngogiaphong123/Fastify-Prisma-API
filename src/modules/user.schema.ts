import { buildJsonSchemas } from 'fastify-zod';
import {z} from 'zod';
const userCore = {
    email : z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({
        message: 'Email is not valid'
    }),
    name: z.string({})

}
const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: 'Password is required',
    }),
})
const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
})
export type CreateUserInput = z.infer<typeof createUserSchema>

export const {schemas : userSchemas , $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema
});