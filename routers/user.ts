import { changePassword, updateProfile } from "../controllers/user";

// Import the Mongoose models and other required modules
import { Router } from "express";

import { authMiddleware } from "../middlewares/auth";
const userRouter = Router();

// Update user profile
userRouter.patch("/update-profile", authMiddleware, updateProfile);

// Change user password
userRouter.patch("/change-password", authMiddleware, changePassword);

export default userRouter;
