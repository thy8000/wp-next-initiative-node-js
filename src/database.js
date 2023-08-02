"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.config = void 0;
var knex_1 = require("knex");
var env_1 = require("./env");
exports.config = {
    client: "sqlite",
    connection: {
        filename: env_1.env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
};
exports.knex = (0, knex_1.knex)(exports.config);
