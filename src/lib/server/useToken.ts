import jwt from "jsonwebtoken";

export function signToken(userId: string, expires: number): string {
  const secret = String(process.env.JWT_SECRET);

  return jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: expires },
  );
}
