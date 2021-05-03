import UserModel from "@models/User.model";
import {
  createMiddlewareDecorator,
  NextFunction,
  NotFoundException,
  UnauthorizedException,
} from "@storyofams/next-api-decorators";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { NextApiRequest } from "next";
import { IRequest } from "types/IRequest";

const JWT_SECRET = String(process.env.JWT_SECRET);

function findCorrectCookie(req: NextApiRequest) {
  if (process.env.NODE_ENV === "production") {
    return req.cookies["__Secure-notey-session"] ?? req.headers["session"];
  } else {
    return req.cookies["__Secure-notey-session"] ?? req.headers["session"];
  }
}

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

export const AuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, _: any, next: NextFunction) => {
    const token: string = findCorrectCookie(req);

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
