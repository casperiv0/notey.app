import { NextApiRequest } from "next";
import {
  createMiddlewareDecorator,
  createParamDecorator,
  NextFunction,
  NotFoundException,
  UnauthorizedException,
} from "@storyofams/next-api-decorators";
import jwt from "jsonwebtoken";
import { isValidObjectId, Schema } from "mongoose";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import UserModel from "@models/User.model";
import { IRequest } from "types/IRequest";
import { ALLOWED_METHODS } from "./shared";

const JWT_SECRET = String(process.env.JWT_SECRET);

async function checkJWT(token: string): Promise<boolean | { userId: string }> {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (error, decode) => {
      if (error) {
        resolve(false);
        return false;
      } else {
        resolve({ userId: (decode as { userId: string })?.userId });
      }
    });
  });
}

/**
 * Check if a user is authenticated
 */
export const AuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, _: any, next: NextFunction) => {
    const token: string = req.cookies["notey-session"] ?? req.headers["session"];

    if (!token) {
      throw new UnauthorizedException("invalid token");
    }

    const vToken = await checkJWT(token);
    if (typeof vToken === "boolean" || !(vToken as { userId: string })?.userId) {
      throw new UnauthorizedException("invalid token");
    }

    if (!isValidObjectId(vToken?.userId)) {
      throw new UnauthorizedException("invalid objectId");
    }

    const user = await UserModel.findById(vToken?.userId);
    if (!user) {
      throw new NotFoundException("user was not found");
    }

    (req as IRequest).userId = user._id;

    next();
  },
);

/**
 * Get the userId from the request
 */
export const UserId = createParamDecorator<Schema.Types.ObjectId | undefined>(
  (req) => (req as IRequest).userId,
);

export const Cors = cors({
  credentials: true,
  origin: [process.env.NEXT_PUBLIC_PROD_ORIGIN!, process.env.DEV_ORIGIN!],
  methods: ALLOWED_METHODS,
});
export const CookieParser = cookieParser();
export const RateLimit = rateLimit({
  skip: (req) => {
    // don't limit /api/notes
    const skipRoutes = ["/api/notes", "/api/categories", "/api/auth/me"];

    if (req.method === "GET" && skipRoutes.some((v) => v === req.url)) return true;

    return false;
  },
  windowMs: 5 * 60 * 1000,
  max: 500,
});

export const Helmet = helmet();
