"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*' // Allows all origins
}));
const server = http_1.default.createServer(app);
// Configure CORS for Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Allows all origins
        methods: ['GET', 'POST'] // Allow only GET and POST requests
    }
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(3233, () => {
    console.log('listening on *:3233');
});
