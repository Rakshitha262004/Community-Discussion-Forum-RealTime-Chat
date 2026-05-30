import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import discussionRoutes from './routes/discussionRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { handleSocketTraffic } from './sockets/chatSocket.js';

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

connectDB();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: "Green Engine Healthy" }));
app.use('/api/auth', authRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/comments', commentRoutes);

handleSocketTraffic(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Production MERN core system operational over port: ${PORT}`));