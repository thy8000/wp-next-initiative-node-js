"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRoutes = void 0;
var database_1 = require("../database");
var zod_1 = require("zod");
var node_crypto_1 = require("node:crypto");
var check_session_id_exists_1 = require("../middlewares/check-session-id-exists");
function transactionsRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            app.get('/', { preHandler: [check_session_id_exists_1.checkSessionIdExists], }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var sessionId, transactions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sessionId = request.cookies.sessionId;
                            return [4 /*yield*/, (0, database_1.knex)('transactions').where('session_id', sessionId).select()];
                        case 1:
                            transactions = _a.sent();
                            return [2 /*return*/, {
                                    transactions: transactions,
                                }];
                    }
                });
            }); });
            app.get('/:id', { preHandler: [check_session_id_exists_1.checkSessionIdExists], }, function (request) { return __awaiter(_this, void 0, void 0, function () {
                var getTransactionsParamsSchema, id, sessionId, transaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getTransactionsParamsSchema = zod_1.z.object({
                                id: zod_1.z.string().uuid(),
                            });
                            id = getTransactionsParamsSchema.parse(request.params).id;
                            sessionId = request.cookies.sessionId;
                            return [4 /*yield*/, (0, database_1.knex)('transactions')
                                    .where({
                                    session_id: sessionId,
                                    id: id,
                                })
                                    .first()];
                        case 1:
                            transaction = _a.sent();
                            return [2 /*return*/, { transaction: transaction }];
                    }
                });
            }); });
            app.get('/summary', { preHandler: [check_session_id_exists_1.checkSessionIdExists], }, function (request) { return __awaiter(_this, void 0, void 0, function () {
                var sessionId, summary;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sessionId = request.cookies.sessionId;
                            return [4 /*yield*/, (0, database_1.knex)('transactions')
                                    .where('session_id', sessionId)
                                    .sum('amount', { as: 'amount' })
                                    .first()];
                        case 1:
                            summary = _a.sent();
                            return [2 /*return*/, { summary: summary }];
                    }
                });
            }); });
            app.post('/', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var createTransactionBodySchema, _a, title, amount, type, sessionId;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            createTransactionBodySchema = zod_1.z.object({
                                title: zod_1.z.string(),
                                amount: zod_1.z.number(),
                                type: zod_1.z.enum(['credit', 'debit']),
                            });
                            _a = createTransactionBodySchema.parse(request.body), title = _a.title, amount = _a.amount, type = _a.type;
                            sessionId = request.cookies.sessionId;
                            if (!sessionId) {
                                sessionId = (0, node_crypto_1.randomUUID)();
                                reply.cookie('sessionId', sessionId, {
                                    path: '/',
                                    maxAge: 1000 * 60 * 60 * 24 * 7,
                                });
                            }
                            return [4 /*yield*/, (0, database_1.knex)('transactions').insert({
                                    id: (0, node_crypto_1.randomUUID)(),
                                    title: title,
                                    amount: type === 'credit' ? amount : amount * -1,
                                    session_id: sessionId,
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, reply.status(201).send()];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.transactionsRoutes = transactionsRoutes;
