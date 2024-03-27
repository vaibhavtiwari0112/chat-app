import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userroutes.js';
import authRoutes from './routes/authroutes.js';
import messageRoutes from './routes/messageroutes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import cors from 'cors';
import { app, server } from "./socket/socket.js";

dotenv.config();


const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json()); 
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Listening on port ${PORT}`);
});
