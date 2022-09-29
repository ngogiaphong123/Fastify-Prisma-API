import { StatusCodes } from 'http-status-codes';
import { FastifyRequest , FastifyReply} from "fastify"
import { CreateProductInput } from "./product.schema"
import { createProduct, getProducts } from "./product.service";
export const createProductHandler = async (request : FastifyRequest<{
    Body : CreateProductInput
}>, reply : FastifyReply) => {
    try {
        const user = request.user;
        const product = await createProduct({...request.body,ownerId : user.id})
        return reply.status(StatusCodes.CREATED).send(product)
    }
    catch(err : any) {
        console.log(err)
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
    }
}
export const getProductHandler = async (request : FastifyRequest, reply : FastifyReply) => {
    const user = request.user;
    const products = await getProducts(user.id);
    return reply.status(StatusCodes.OK).send(products)
}
