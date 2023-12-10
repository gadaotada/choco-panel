"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "3306"),
    multipleStatements: true,
    waitForConnections: true,
    idleTimeout: 10000,
    connectionLimit: 50
});
exports.default = pool;
