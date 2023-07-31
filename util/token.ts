import jwt, {
  JsonWebTokenError,
  JwtPayload,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
export async function generateToken(user: User) {
  return jwt.sign({ id: user.id, }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export async function verifyToken(token: string) {
  let decoded: JwtPayload | null = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  } catch (error: any) {
    console.log(error.message);
  }
  return decoded;
}
