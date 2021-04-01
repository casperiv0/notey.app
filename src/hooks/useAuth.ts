import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { isValidObjectId } from "mongoose";
import cors, { CorsOptions } from "cors";
import { NextApiResponse } from "next";
import User from "../models/User.model";
import { IRequest } from "types/IRequest";
import { middleWare } from "@lib/middleware";
import { ALLOWED_METHODS } from "@lib/shared";

const corsOptions: CorsOptions = {
  credentials: true,
  origin: [process.env.NEXT_PUBLIC_PROD_ORIGIN!, process.env.DEV_ORIGIN!],
  methods: ALLOWED_METHODS,
};

export default async function (req: IRequest, res: NextApiResponse): Promise<string> {
  await middleWare(req, res, cookieParser());
  await middleWare(req, res, cors(corsOptions));
  const token: string = req.cookies["notey-session"] ?? req.headers["session"];
  const secret = String(process.env.JWT_SECRET);

  if (!token) {
    return Promise.reject("invalid token");
  }

  try {
    const vToken = jwt.verify(token, secret) as { userId: string };

    if (!vToken?.userId) {
      return Promise.reject("invalid token");
    }

    if (!isValidObjectId(vToken?.userId)) {
      return Promise.reject("Invalid object Id");
    }

    const user = await User.findById(vToken?.userId);

    if (!user) {
      return Promise.reject("user not found");
    }

    req.userId = user._id;

    return Promise.resolve("Authorized");
  } catch {
    return Promise.reject("invalid token");
  }
}
