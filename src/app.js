"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var fastify_1 = require("fastify");
var cookie_1 = require("@fastify/cookie");
var transactions_1 = require("./routes/transactions");
exports.app = (0, fastify_1.default)();
exports.app.register(cookie_1.default);
exports.app.register(transactions_1.transactionsRoutes, {
    prefix: 'transactions',
});
