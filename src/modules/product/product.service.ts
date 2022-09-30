import prisma from "../../utils/prisma";
import { CreateProductInput, updateProductInput, updateProductParam } from "./product.schema";

export async function createProduct(input : CreateProductInput & {ownerId : number}) {
    return await prisma.product.create({
        data : {
            ...input, ownerId : input.ownerId
        }
    })
}
export async function getProducts(userId : number) {
    return await prisma.product.findMany({
        where : {
            ownerId : userId
        }
    })
}
export async function updateProduct(input : updateProductInput , productId : number) {
    return await prisma.product.update({
        where : {
            id : productId,
        },
        data : {
            ...input,
        }
    })
}