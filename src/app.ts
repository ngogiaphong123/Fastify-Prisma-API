import fastifyJwt from 'fastify-jwt';
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { userRoutes } from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { StatusCodes } from 'http-status-codes';
import { ProductSchemas } from './modules/product/product.schema';
import { productRoutes } from './modules/product/product.route';
export const server = Fastify();
declare module "fastify" {
    export interface FastifyInstance {
        authenticate : any
    }
}
declare module "fastify-jwt" {
    export interface FastifyJWT {
        user : {
            id : number,
            email : string,
            name : string
        }
    }
}
server.register(fastifyJwt, {
    secret: 'supersecret'
})
server.decorate('authenticate', async (request : FastifyRequest, reply : FastifyReply)=> {
    try {
        await request.jwtVerify();
    }
    catch(e : any) {
        reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
})
const port = process.env.PORT || 3000;
for(const schema of [...userSchemas,...ProductSchemas]) {
    server.addSchema(schema)
}
server.get('/healthCheck', async (request : FastifyRequest,reply : FastifyReply) => {
    return {status : 'ok'}
})
server.register(userRoutes , {prefix : '/api/users'})
server.register(productRoutes , {prefix : '/api/products'})
server.listen({port : 3000 , host : "0.0.0.0"}, (err , address) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on port ${address}`);
})