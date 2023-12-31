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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_get_1 = require("./helpers/data-get");
const data_mutt_1 = require("./helpers/data-mutt");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const servers = yield (0, data_get_1.getServers)();
    if (!servers) {
        return res.status(500).json('Server error, please try again later');
    }
    return res.status(200).json(servers);
}));
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, server_name, server_host, server_port, server_username, server_password, server_note } = req.body;
    const server = yield (0, data_mutt_1.createServer)(id, server_name, server_host, server_port, server_username, server_password, server_note);
    if (!server) {
        return res.status(500).json('Server error, please try again later');
    }
    return res.status(200).json(server);
}));
exports.default = router;
