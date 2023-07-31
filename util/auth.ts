import { User } from "../config/db";
import { verifyToken } from "./token";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const passwordCompare = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};


export async function isAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const decodedToken = await verifyToken(req.cookies.token);
    if (!decodedToken) {
      return res.status(401).send({
        data: {
          message: "unauthorized",
        },
      });
    }
    const user = await User.findUniqueOrThrow({
      where: {
        id: decodedToken.id as string,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        id: true,
        updatedAt: true,
        img: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (error: any) {
    return res.status(401).send({
      data: {
        message: "unauthorized",
      },
    });
  }
}
