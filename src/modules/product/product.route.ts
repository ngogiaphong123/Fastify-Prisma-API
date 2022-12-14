import { createProductHandler , getProductHandler ,updateProductHandler} from './product.controller'; 
import { FastifyInstance } from 'fastify';
import { $ref } from './product.schema';

export async function productRoutes(server: FastifyInstance) {
    server.post('/',{
        preHandler : server.authenticate,
        schema : {
            body : $ref('createProductSchema'),
            response : {
                201 : $ref('productResponseSchema')
            }
        }
    },createProductHandler)
    server.get('/',{
        preHandler : server.authenticate,
        schema : {
            response : {
                200 : $ref('productListSchema')
            }
        }
    }, getProductHandler)
    server.patch('/:productId' , {
        preHandler : server.authenticate,
        schema : {
            body : $ref('updateProductSchema'),
            params : $ref('updateProductParam'),
            response : {
                200 : $ref('productResponseSchema')
            },
        }
    },updateProductHandler)
}