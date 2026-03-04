import express from 'express';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import dotenv from 'dotenv';
import { connectToDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app , server } from './lib/socket.js';

dotenv.config()

connectToDB(process.env.MONGODB_URI)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET","PUT","POST","DELETE"],
    credentials : true
}))

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

const port = process.env.PORT

server.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
    
})