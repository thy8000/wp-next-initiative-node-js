"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("./env");
var app_1 = require("./app");
app_1.app.listen({
    port: env_1.env.PORT,
}).then(function () {
    console.log('HTTP Server Running!');
});
