"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
var knex_1 = require("knex");
exports.knex = (0, knex_1.knex)({
    client: "sqlite",
    connection: {
        filename: "./tmp/app.db",
    },
});
