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
exports.validateAdminHeader = exports.validateSecretHeader = void 0;
const apiKey = process.env.API_FRONT_KEY;
const adminKey = process.env.ADMIN_KEY;
function validateSecretHeader(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const secretHeader = req.get('choco-auth-key');
        if (!secretHeader || !apiKey) {
            return res.status(401).send('Unauthorized');
        }
        if (apiKey && secretHeader !== apiKey) {
            return res.status(401).send('Unauthorized');
        }
        next();
    });
}
exports.validateSecretHeader = validateSecretHeader;
function validateAdminHeader(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminHeader = req.get('choco-admin-key');
        if (!adminHeader) {
            return res.status(401).send('Unauthorized');
        }
        if (!adminKey) {
            return res.status(500).send('Issue with auth server, please try again later');
        }
        if (adminKey && adminHeader !== adminKey) {
            return res.status(401).send('Unauthorized');
        }
        next();
    });
}
exports.validateAdminHeader = validateAdminHeader;
