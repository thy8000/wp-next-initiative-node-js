"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.config = void 0;
var knex_1 = require("knex");
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
