"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
var env_1 = require("./env");
var transactions_1 = require("./routes/transactions");
var cookie_1 = require("@fastify/cookie");
var app = (0, fastify_1.default)();
app.register(cookie_1.default);
app.register(transactions_1.transactionsRoutes, {
    prefix: 'transactions',
});
app.listen({
    port: env_1.env.PORT,
}).then(function () {
    console.log('HTTP Server Running!');
});
