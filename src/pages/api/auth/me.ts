import { NextApiResponse } from "next";
import useAuth from "@hooks/useAuth";
import { IRequest } from "types/IRequest";
import UserModel from "src/models/User.model";
import useCookie from "src/hooks/useCookie";
import NoteModel from "@models/Note.model";
import CategoryModel from "@models/Category.model";
import "@lib/database";

export default async function handler(req: IRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    await useAuth(req, res);
  } catch (e) {
    return res.json({
      error: e,
      status: "error",
    });
  }

  switch (method) {
    case "DELETE": {
      try {
        const user = await UserModel.findById(req.userId);

        await NoteModel.deleteMany({ user_id: user._id });
        await CategoryModel.deleteMany({ user_id: user._id });
        await UserModel.findByIdAndDelete(user._id);
        useCookie(res, "notey-session", "", 0);

        return res.json({ user: null, status: "success" });
      } catch (e) {
        console.error(e);

        return res.json({
          error: "An unexpected error occurred",
          status: "error",
        });
      }
    }
    default: {
      return res.status(405).json({
        msg: "Method not allowed",
        error: true,
      });
    }
  }
}
