import { ObjectId } from "mongoose";
import { NextApiRequest } from "next";

export interface IRequest extends NextApiRequest {
  userId: ObjectId;
}
