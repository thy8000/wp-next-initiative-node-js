import { FastifyInstance } from "fastify";
import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance){
    app.post('/', async (request) => {
        
        const createTransactionBodySchema = z.object

        return transactions
    })
}