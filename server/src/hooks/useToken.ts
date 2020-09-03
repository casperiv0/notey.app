import jwt from "jsonwebtoken";
import { AuthUser } from "../interfaces";

/**
 * @param {Object} user User object to save in token
 * @param {Number} expires Expire date of token
 * @returns {string} Created token
 */
export default function (user: AuthUser, expires: number): string {
  const secret = String(process.env.JWT_SECRET);

  return jwt.sign(user, secret, { expiresIn: expires });
}
