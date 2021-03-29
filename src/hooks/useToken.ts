import jwt from "jsonwebtoken";

export default function (userId: string, expires: number): string {
  const secret = String(process.env.JWT_SECRET);

  return jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: expires },
  );
}
