import { FastifyInstance } from "fastify";
import { createUserHandler, userLoginHandler , getUsersHandler} from "./user.controller";
import { $ref } from "./user.schema";

export async function userRoutes(server: FastifyInstance) {
    server.post('/', {
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('userResponseSchema')
            }
        }
    }, createUserHandler)
    server.post('/login',{
        schema : {
            body : $ref('loginUserSchema'),
            response : {
                200 : $ref('loginResponseSchema')
            }
        }
    }, userLoginHandler)
    server.get('/',{
        schema : {
            response : {
                200 : $ref('userListSchema')
            }
        }
    },getUsersHandler)
}