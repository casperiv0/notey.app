import jwt from "jsonwebtoken";
import { AuthUser } from "../interfaces";

export default function (data: AuthUser, expires: number): string {
  const secret = String(process.env.JWT_SECRET);

  return jwt.sign(data, secret, { expiresIn: expires });
}
