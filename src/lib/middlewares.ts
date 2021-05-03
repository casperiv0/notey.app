// import UserModel from "@models/User.model";
// import {
//   createMiddlewareDecorator,
//   NextFunction,
//   NotFoundException,
//   UnauthorizedException,
// } from "@storyofams/next-api-decorators";
// import jwt from "jsonwebtoken";
// import { isValidObjectId } from "mongoose";
// import { IRequest } from "types/IRequest";

// const JWT_SECRET = String(process.env.JWT_SECRET);

// async function checkJWT(token: string): Promise<boolean | { userId: string }> {
//   return new Promise((resolve) => {
//     jwt.verify(token, JWT_SECRET, (error, decode) => {
//       if (error) {
//         resolve(false);
//         return false;
//       } else {
//         console.log(decode);

//         resolve({ userId: `${decode}` });
//       }
//     });
//   });
// }

// export const AuthGuard = createMiddlewareDecorator(
//   async (req: IRequest, _: any, next: NextFunction) => {
//     const token: string = req.cookies["notey-session"] ?? req.headers["session"];

//     if (!token) {
//       throw new UnauthorizedException("invalid token");
//     }

//     const vToken = await checkJWT(token);
//     if (typeof vToken === "boolean" || !(vToken as { userId: string })?.userId) {
//       throw new UnauthorizedException("invalid token");
//     }

//     if (!isValidObjectId(vToken?.userId)) {
//       throw new UnauthorizedException("invalid objectId");
//     }

//     const user = await UserModel.findById(vToken?.userId);
//     if (!user) {
//       throw new NotFoundException("user was not found");
//     }

//     req.userId = user._id;

//     next();
//   },
// );

export {};
