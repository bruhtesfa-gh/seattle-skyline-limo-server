import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import authRouter from './routers/authrouter';
import blogRouter from './routers/blog';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/auth', authRouter);
app.use("/blog", blogRouter);

// etc...
connectDB().then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server listening on port ${'http://localhost:' + process.env.PORT || 4000}`);
    });
}).catch((err: any) => {
    console.log(err);
});

export default app;