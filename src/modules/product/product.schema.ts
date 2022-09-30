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
const updateProductSchema = z.object({
    ...productInput,
})
const updateProductParam = z.object({
    productId : z.number({
        required_error: 'Product id is required',
    })
})
const productListSchema = z.array(productResponseSchema)
export type CreateProductInput = z.infer<typeof createProductSchema>
export type updateProductInput = z.infer<typeof updateProductSchema>
export type updateProductParam = z.infer<typeof updateProductParam>
export const {schemas : ProductSchemas , $ref } = buildJsonSchemas({
    createProductSchema,
    productResponseSchema,
    productListSchema,
    updateProductSchema,
    updateProductParam
},{$id : 'product'})