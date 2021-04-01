import { isValidObjectId } from "mongoose";
import { NextApiResponse } from "next";
import { IRequest } from "types/IRequest";
import useAuth from "@hooks/useAuth";
import { errorObj } from "@lib/utils";
import "@lib/database";
import CategoryModel, { ICategory } from "@models/Category.model";
import NoteModel, { INote } from "@models/Note.model";

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
        if (!isValidObjectId(query.id)) {
          return res.status(400).json({
            error: "Invalid objectId",
            status: "error",
          });
        }

        const category: ICategory = await CategoryModel.findById(query.id);

        if (!category) {
          return res.status(404).json(errorObj("category was not found"));
        }

        if (req.userId.toString() !== category?.user_id.toString()) {
          return res.status(401).json(errorObj("Permission Denied"));
        }

        const notes = await NoteModel.find({ category_id: query.id, user_id: req.userId });

        await Promise.all(
          notes.map(async (note: INote) => {
            note.category_id = "no_category";
            await note.save();
          }),
        );

        await CategoryModel.findByIdAndDelete(query.id);

        const categories = await CategoryModel.find({ user_id: req.userId });
        const updatedNotes = await NoteModel.find({ user_id: req.userId });

        return res.json({
          categories,
          notes: updatedNotes,
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
