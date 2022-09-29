import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { server } from '../../app';
import { verifyPassword } from '../../utils/hash';
import { CreateUserInput, LoginUserInput } from './user.schema';
import { createUser, findUserByEmail, findUsers } from './user.service';

export const createUserHandler = async (request: FastifyRequest<{
    Body: CreateUserInput
}>, reply: FastifyReply) => {
    try {
        const user = await createUser(request.body)
        return reply.status(StatusCodes.CREATED).send(user)
    }
    catch (err: any) {
        console.log(err)
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
    }
}

export const userLoginHandler = async (request: FastifyRequest<{
    Body: LoginUserInput
}>, reply: FastifyReply) => {
    try {
        const user = await findUserByEmail(request.body.email)
        if (!user) {
            return reply.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials')
        }
        const candidatePassword = request.body.password
        const isCorrectPassword = verifyPassword({ candidatePassword, salt: user.salt, hash: user.password })
        if (!isCorrectPassword) {
            return reply.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials')
        }
        const { password, salt, ...rest } = user
        return { accessToken: server.jwt.sign(rest) }
    }
    catch (err: any) {
        console.log(err)
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
    }
}

export const getUsersHandler = async (request : FastifyRequest , reply : FastifyReply) => {
    try {
        const userList = await findUsers();
        return reply.status(StatusCodes.OK).send(userList)
    }
    catch(err : any) {
        console.log(err)
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
    }
}