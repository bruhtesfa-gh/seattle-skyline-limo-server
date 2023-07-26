// middlewares/auth.js

import jwt from 'jsonwebtoken';
import { User } from '../schema/schema';

export const authMiddleware = async (req: any, res: any, next: any) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findOne({ _id: decoded?.id });
        if (user === null) {
            return res.status(401).send('Unauthorized');
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
}