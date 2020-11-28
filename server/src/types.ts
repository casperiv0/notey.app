import { Request } from "express";
import { IUser } from "./models/User.model";

export interface IRequest extends Request {
  user?: IUser;
}
