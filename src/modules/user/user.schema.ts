import { buildJsonSchemas } from 'fastify-zod';
import {z} from 'zod';
const userCore = {
    email : z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({
        message: 'Email is not valid'
    }),
    name: z.string({}).optional()
}
const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: 'Password is required',
    }),
})
const userResponseSchema = z.object({
    id: z.number(),
    ...userCore,
})
const loginUserSchema = z.object({
    email : z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({
        message: 'Email is not valid'
    }),
    password: z.string({
        required_error: 'Password is required',
    })
})
const loginResponseSchema = z.object({
    accessToken : z.string({
        required_error: 'Access token is required',
    })
})
const userListSchema = z.array(userResponseSchema)
export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginUserInput = z.infer<typeof loginUserSchema>
export const {schemas : userSchemas , $ref } = buildJsonSchemas({
    createUserSchema,
    userResponseSchema,
    loginUserSchema,
    loginResponseSchema,
    userListSchema
},{$id : 'user'});