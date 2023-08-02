import fastify from 'fastify'
import * as crypto from 'node:crypto'
import {knex} from './database'
import { env } from './env'

const app = fastify()

app.get('/insert', async () => {
  const transaction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Transação de teste',
    amount: 1000,
  }).returning('*')

  return transaction
})

app.get('/select', async () => {
  const transaction = await knex('transactions').select('*')

  return transaction
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('HTTP Server Running!')
})