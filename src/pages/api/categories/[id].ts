import { NextApiResponse } from "next";
import { IRequest } from "types/IRequest";
import useAuth from "@hooks/useAuth";
import { errorObj } from "@lib/utils";
import "@lib/database";
import CategoryModel from "@models/Category.model";
import NoteModel from "@models/Note.model";

export default async function handler(req: IRequest, res: NextApiResponse) {
  const { method, query } = req;

  try {
    await useAuth(req, res);
  } catch (e) {
    return res.json(errorObj(e));
  }

  switch (method) {
    case "DELETE": {
      try {
        const category = await CategoryModel.findById(query.id);

        if (!category) {
          return res.status(404).json(errorObj("category was not found"));
        }

        if (req.userId.toString() !== category?.user_id.toString()) {
          return res.status(401).json(errorObj("Permission Denied"));
        }

        await NoteModel.deleteMany({ category_id: query.id, user_id: req.userId });
        await CategoryModel.findByIdAndDelete(query.id);

        const categories = await CategoryModel.find({ user_id: req.userId });

        return res.json({
          categories,
          status: "success",
        });
      } catch (e) {
        console.error(e);

        return res.status(500).json({
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
