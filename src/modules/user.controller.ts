import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { CreateUserInput } from './user.schema';
import { createUser } from './user.service';

export const createUserHandler = async (request: FastifyRequest<{
    Body: CreateUserInput
}>, reply: FastifyReply) => {
    try {
        const user = await createUser(request.body)
        return reply.status(StatusCodes.CREATED).send(user)
    }
    catch(err : any) {
        console.log(err)
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
    }
}

export const getUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    
}