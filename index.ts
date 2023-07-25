import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import authRouter from './routers/authrouter';
const app = express();

dotenv.config();

app.use(express.json());

app.use('/auth', authRouter);
// etc...
connectDB().then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server listening on port ${'http://localhost:' + process.env.PORT || 4000}`);
    });
}).catch((err) => {
    console.log(err);
});

export default app;