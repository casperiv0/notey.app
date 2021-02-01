import { NextFunction, Response } from "express";
import { IRequest } from "./types";
import { errorObj } from "./utils/utils";

export function notFound(_req: IRequest, res: Response): Response {
  return res.json(errorObj("path not found")).status(404);
}

export function checkHeaders(req: IRequest, res: Response, next: NextFunction): Response | void {
  const { method, headers } = req;

  if (method !== "GET" && !headers["content-type"]?.includes("application/json")) {
    return res.json(errorObj("Content-Type must be application/json")).status(400);
  }

  next();
}
