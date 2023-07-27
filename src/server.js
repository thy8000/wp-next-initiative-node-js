"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
var app = (0, fastify_1.default)();
app.get('/hello', function () {
    return 'Hello Worldasadsa';
});
app.listen({
    port: 6666,
}).then(function () {
    console.log('HTTP Server Running!');
});
