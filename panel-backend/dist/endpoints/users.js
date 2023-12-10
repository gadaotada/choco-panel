"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Yup = __importStar(require("yup"));
const validations_1 = require("../validations");
const global_helper_1 = require("../global-helper");
const data_get_1 = require("./helpers/data-get");
const data_mutt_1 = require("./helpers/data-mutt");
const createNewUserSchema = Yup.object().shape({
    id: Yup.number().required('Id is required').max(10000, 'Max id reached, contact MVV bruh'),
    username: Yup.string().required('Name is required').min(3, 'Name has to include at least 3 characters').max(20, 'Name has to include at most 20 characters'),
    password: Yup.string().required('Password is required').min(6, 'Password has to include at least 6 characters'),
    role: Yup.string().required('Role is required').oneOf(['choco-admin', 'choco-user']),
    note: Yup.string().nullable()
});
const router = (0, express_1.Router)();
router.get('/', validations_1.validateAdminHeader, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, data_get_1.getUsers)();
    if (users) {
        return res.status(200).json(users);
    }
    return res.status(500).json('Server error, please try again later');
}));
router.post('/create', validations_1.validateAdminHeader, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, password, role, note } = req.body;
    const newUser = yield (0, data_mutt_1.handleUser)(id, username, password, role, note);
    const validation = (0, global_helper_1.validateData)(createNewUserSchema, req.body);
    if (!validation.isValid) {
        return res.status(400).json(validation.error);
    }
    if (newUser) {
        return res.status(200).json('New User was created');
    }
    return res.status(500).json('Server error, please try again later');
}));
exports.default = router;
