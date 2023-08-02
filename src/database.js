"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.config = void 0;
require("dotenv/config");
var knex_1 = require("knex");
console.log(process.env);
exports.config = {
    client: "sqlite",
    connection: {
        filename: "./db/app.db",
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
};
exports.knex = (0, knex_1.knex)(exports.config);
