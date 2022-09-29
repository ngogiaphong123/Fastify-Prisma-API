import Fastify, { FastifyReply, FastifyRequest } from "fastify";

const server = Fastify();
const port = process.env.PORT || 3000;
server.get('/healthCheck', async (request : FastifyRequest,reply : FastifyReply) => {
    return {status : 'ok'}
})

server.listen({port : 3000 , host : "0.0.0.0"}, (err , address) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on port ${address}`);
})