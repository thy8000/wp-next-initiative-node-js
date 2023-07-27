import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
    return 'Hello Worldasadsa'
})

app.listen({
    port: 6666,
}).then(() => {
    console.log('HTTP Server Running!')
})