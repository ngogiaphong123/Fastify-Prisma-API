import { buildJsonSchemas } from 'fastify-zod'
import {z} from 'zod'
const productInput = {
    title : z.string({
        required_error: 'Title is required',
    }),
    price : z.number({
        required_error: 'Price is required',
    }).positive({
        message: 'Price must be positive'
    }),
    content: z.string({
        required_error: 'Content is required',
    })
}
const productGeneratedByPrisma = {
    id : z.number({}),
    createdAt : z.string({}),
    updatedAt : z.string({}),
}
const createProductSchema = z.object({
    ...productInput
})
const productResponseSchema = z.object({
    ...productInput,
    ...productGeneratedByPrisma
})
const productListSchema = z.array(productResponseSchema)
export type CreateProductInput = z.infer<typeof createProductSchema>
export const {schemas : ProductSchemas , $ref } = buildJsonSchemas({
    createProductSchema,
    productResponseSchema,
    productListSchema
},{$id : 'product'})