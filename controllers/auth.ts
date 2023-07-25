import jwt from 'jsonwebtoken';
import { comparePasswords, hashPassword } from '../utils/auth';
import { CustomRequest, CustomResponse, } from '../types/types';
import { User } from '../schema/schema';
export const register = async (req: any, res: any) => {

    const { firstName, lastName, email, password } = req.body as any;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).send('Email already in use');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    res.status(201).json(user);
}

export const login = async (req: any, res: any) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }

    // Check for user
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send('User not found');
    }

    // Compare passwords
    const match = await comparePasswords(password, user.password);

    if (!match) {
        return res.status(400).send('Invalid credentials');
    }

    // Create signed JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
        success: true,
        token,
        message: 'Login successful',
    });
}
