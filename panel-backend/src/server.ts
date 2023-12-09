import express from 'express';
import fs from 'fs';
import cors from 'cors';
import http from 'http';
import path  from 'path';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import { validateSecretHeader } from './validations';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*', // Allow all origins change it in production!!!
}));
app.use(validateSecretHeader); // choco-auth-key header check (will result in 404 if missing or incorrect!)

const server = http.createServer(app);

// Loading the api routes/endpoints

function looksLikeRouter(obj: any): boolean {
  return obj && obj.stack && Array.isArray(obj.stack) && typeof obj.use === 'function';
}

async function loadRoutes(dir: string, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const routePath = entry.name === 'index.ts' ? prefix : path.join(prefix, entry.name.replace(/\.ts$|\.js$/, ''));

      if (entry.isDirectory()) {
          await loadRoutes(fullPath, routePath);  // Recurse into directories
      } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.js'))) {
        const routeModule = await import(fullPath);
        if (looksLikeRouter(routeModule.default)) {
          app.use(`/${routePath}`, routeModule.default);
          console.log(`Loaded route: /${routePath}`);
        }
      }
  }
}

// Configure CORS for Socket.IO
const io = new Server(server, {
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

server.listen(4002, async () => {
  await loadRoutes(path.join(__dirname, 'endpoints'));
  console.log('Server is listening on *:4002 GL developers 😊');
});
