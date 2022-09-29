import prisma from "../../utils/prisma";
import { CreateProductInput } from "./product.schema";

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