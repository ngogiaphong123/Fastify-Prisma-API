import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { userRoutes } from "./modules/user.route";
import { userSchemas } from "./modules/user.schema";
const server = Fastify();
const port = process.env.PORT || 3000;
for(const schema of userSchemas) {
    server.addSchema(schema)
}
server.get('/healthCheck', async (request : FastifyRequest,reply : FastifyReply) => {
    return {status : 'ok'}
})
server.register(userRoutes , {prefix : '/api/users'})
server.listen({port : 3000 , host : "0.0.0.0"}, (err , address) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on port ${address}`);
})