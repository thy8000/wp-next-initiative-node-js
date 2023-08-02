"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
var zod_1 = require("zod");
var envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: zod_1.z.string(),
    PORT: zod_1.z.number().default(6666),
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('Invalid environment variables', _env.error.format());
    throw new Error('Invalid environment variables.');
}
exports.env = _env.data;
