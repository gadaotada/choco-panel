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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServers = exports.getUsers = exports.getUser = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const global_helper_1 = require("../../global-helper");
const getUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const poolConn = yield connection_1.default.getConnection();
    try {
        const [rows] = yield poolConn.query('SELECT id, username, password, role FROM users WHERE username = ? AND password = ?', [username, password]);
        if (rows.length > 0) {
            return {
                id: rows[0].id,
                name: rows[0].username,
                role: rows[0].role
            };
        }
        return null;
    }
    catch (error) {
        console.error(`${(0, global_helper_1.timeStampGen)()} Error generated by fn getUser at ./panel-backend/src/endpoints/helpers/data-get.ts info: ${error}`);
        return null;
    }
    finally {
        poolConn.release();
    }
});
exports.getUser = getUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const poolConn = yield connection_1.default.getConnection();
    try {
        const [rows] = yield poolConn.query('SELECT * FROM users;');
        if (rows.length > 0) {
            const users = rows.map((row) => ({
                id: row.id,
                name: row.name,
                password: 'placeholder-choco',
                role: row.role,
                note: row.note
            }));
            return users;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.error(`${(0, global_helper_1.timeStampGen)()} Error generated by fn getUsers at ./panel-backend/src/endpoints/helpers/data-get.ts info: ${error}`);
        return null;
    }
    finally {
        poolConn.release();
    }
    ;
});
exports.getUsers = getUsers;
const getServers = () => __awaiter(void 0, void 0, void 0, function* () {
    const poolConn = yield connection_1.default.getConnection();
    try {
        const [rows] = yield poolConn.query('SELECT * FROM servers;');
        if (rows.length > 0) {
            const servers = rows.map((row) => ({
                id: row.id,
                server_name: row.server_name,
                server_host: row.server_host,
                server_port: row.server_port,
                server_username: row.server_username,
                server_password: row.server_password,
                server_note: row.server_note
            }));
            return servers;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.error(`${(0, global_helper_1.timeStampGen)()} Error generated by fn getServers at ./panel-backend/src/endpoints/helpers/data-get.ts info: ${error}`);
        return null;
    }
    finally {
        poolConn.release();
    }
    ;
});
exports.getServers = getServers;