import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import authRouter from './routers/authrouter';
import blogRouter from './routers/blog';
import bookRouter from './routers/book';
import userRouter from './routers/user';
import vehicleRouter from './routers/vehicle';
import { getStats } from './controllers/stat';
import { authMiddleware } from './middlewares/auth';
import { me } from './controllers/user';
import path from 'path';
const app = express();

dotenv.config();

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.use('/auth', authRouter);
app.use("/blog", blogRouter);
app.use("/book", bookRouter);
app.use("/user", userRouter);
app.use("/vehicle", vehicleRouter);
app.get("/stat", getStats);
app.get("/me", authMiddleware, me);

// etc...
connectDB().then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server listening on port ${'http://localhost:' + process.env.PORT || 4000}`);
    });
}).catch((err: any) => {
    console.log(err);
});

export default app;