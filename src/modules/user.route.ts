import { FastifyInstance } from "fastify";
import { createUserHandler, getUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

export async function userRoutes(server: FastifyInstance) {
    server.post('/', {
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('createUserResponseSchema')
            }
        }
    }, createUserHandler)
    server.get('/', getUserHandler)
}