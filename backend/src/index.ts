import express from 'express';

import http from 'http';
import { Server } from 'ws';

import cors from 'cors';

import postRoutes from './routes/post-routes';

import { connectionWs } from './websocket/config';

export const app = express();
const server = http.createServer(app);

const wss = new Server({ server });
wss.on('connection', connectionWs);

app.use(cors())
app.use(express.json());
app.use('/api', postRoutes);

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});