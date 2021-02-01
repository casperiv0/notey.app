import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { IRequest } from "../types";
import User from "../models/User.model";
import { AuthUser } from "../interfaces";

export default async function (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token: string = req.cookies["notey-session"];
  const secret = String(process.env.JWT_SECRET);

  if (!token) {
    res.json({ server_error: "invalid token", status: "error" }).status(401);
    return;
  }

  try {
    const vToken = jwt.verify(token, secret) as AuthUser;
    const user = await User.findById(vToken._id);

    if (!user) {
      res
        .json({
          server_error: "user not found",
          status: "error",
        })
        .status(401);
      return;
    }

    req.user = user;

    next();
  } catch {
    res.json({ server_error: "invalid token", status: "error" }).status(401);
    return;
  }
}
