import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import authRouter from './routers/authrouter';
import blogRouter from './routers/blog';
import bookRouter from './routers/book';
import userRouter from './routers/user';
import vehicleRouter from './routers/vehicle';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/auth', authRouter);
app.use("/blog", blogRouter);
app.use("/book", bookRouter);
app.use("/user", userRouter);
app.use("/vehicle", vehicleRouter);

// etc...
connectDB().then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server listening on port ${'http://localhost:' + process.env.PORT || 4000}`);
    });
}).catch((err: any) => {
    console.log(err);
});

export default app;