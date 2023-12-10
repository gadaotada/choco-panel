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
exports.createServer = exports.handleUser = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const global_helper_1 = require("../../global-helper");
const handleUser = (id, username, password, note, role) => __awaiter(void 0, void 0, void 0, function* () {
    const poolConn = yield connection_1.default.getConnection();
    try {
        const query = 'INSERT ON DUBLICAT KEY UPDATE';
        const [rows] = yield poolConn.execute(query, [id, username, password, note, role]);
        return rows.affectedRows >= 1;
    }
    catch (error) {
        console.error(`${(0, global_helper_1.timeStampGen)()} Error generated by func handleUser at /src/endpoints/helpers/data-mutt.ts: ${error}`);
        return null;
    }
    finally {
        poolConn.release();
    }
    ;
});
exports.handleUser = handleUser;
const createServer = (id, server_name, server_host, server_port, server_username, server_password, server_note) => __awaiter(void 0, void 0, void 0, function* () {
    const poolConn = yield connection_1.default.getConnection();
    try {
        const query = `INSERT INTO servers (server_name, server_host, server_port, server_username, server_password, server_note)
                                            VALUES(?, ?, ?, ?, ?, ?)
        `;
        const [rows] = yield poolConn.execute(query, [server_name, server_host, server_port, server_username, server_password, server_note]);
        return rows.insertId;
    }
    catch (error) {
        console.error(`${(0, global_helper_1.timeStampGen)()} Error generated by func createServer at /src/endpoints/helpers/data-mutt.ts: ${error}`);
        return null;
    }
    finally {
        poolConn.release();
    }
    ;
});
exports.createServer = createServer;
