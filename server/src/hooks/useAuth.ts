import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { IRequest } from "../types";
import User from "../models/User.model";

export default async function (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<unknown> {
  const token: string = req.cookies.__token;
  const secret = String(process.env.JWT_SECRET);

  if (!token) {
    return res
      .json({ server_error: "invalid token", status: "error" })
      .status(401);
  }

  try {
    const vToken: any = jwt.verify(token, secret);
    console.log(vToken);

    const user = await User.findById(vToken._id);

    if (!user) {
      return res
        .json({
          server_error: "user not found",
          status: "error",
        })
        .status(401);
    }

    req.user = user;

    next();
  } catch {
    return res
      .json({ server_error: "invalid token", status: "error" })
      .status(401);
  }
}
