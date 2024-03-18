import express from 'express';
import dotenv  from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userroutes.js';
import authRoutes from './routes/authroutes.js';
import messageRoutes from './routes/messageroutes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); // to parse the incoming requests with JSON payloads (from req)
app.use(cookieParser());

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);
app.use("/api/users" , userRoutes);
app.listen(5000 , ()=>{ 
    connectToMongoDB();
    console.log(`listening on port ${PORT}`)})