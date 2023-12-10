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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const connection_1 = require("./remote/connection");
const myenvPath = path_1.default.join(__dirname, '../.env');
dotenv_1.default.config({ path: myenvPath });
const validations_1 = require("./validations");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*', // Allow all origins change it in production!!!
}));
app.use(validations_1.validateSecretHeader); // choco-auth-key header check (will result in 404 if missing or incorrect!)
const server = http_1.default.createServer(app);
// Loading the api routes/endpoints
function looksLikeRouter(obj) {
    return obj && obj.stack && Array.isArray(obj.stack) && typeof obj.use === 'function';
}
function loadRoutes(dir, prefix = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = fs_1.default.readdirSync(dir, { withFileTypes: true });
        for (let entry of entries) {
            const fullPath = path_1.default.join(dir, entry.name);
            const routePath = entry.name === 'index.ts' ? prefix : path_1.default.join(prefix, entry.name.replace(/\.ts$|\.js$/, ''));
            if (entry.isDirectory()) {
                yield loadRoutes(fullPath, routePath); // Recurse into directories
            }
            else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.js'))) {
                const routeModule = yield Promise.resolve(`${fullPath}`).then(s => __importStar(require(s)));
                if (looksLikeRouter(routeModule.default)) {
                    app.use(`/${routePath}`, routeModule.default);
                    console.log(`Loaded route: /${routePath}`);
                }
            }
        }
    });
}
// Configure CORS for Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Allows all origins
        methods: ['GET', 'POST'] // Allow only GET and POST requests
    }
});
io.on('connection', (socket) => {
    console.log('a user connected');
    (0, connection_1.megaTestaBate)();
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(4002, () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadRoutes(path_1.default.join(__dirname, 'endpoints'));
    console.log('Server is listening on *:4002 GL developers 😊');
}));
