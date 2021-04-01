import { NextApiResponse } from "next";
import { IRequest } from "types/IRequest";
import useAuth from "@hooks/useAuth";
import { errorObj, isTrue, parseLockedNotes } from "@lib/utils";
import NoteModel, { NoteDoc } from "@models/Note.model";
import useMarkdown from "@hooks/useMarkdown";
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
    case "GET": {
      try {
        const notes = await NoteModel.find({ user_id: req.userId });

        return res.json({
          notes,
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
    case "POST": {
      const { categoryId, title, body, shareable, locked } = req.body;

      if (!categoryId || !title || !body) {
        return res.status(400).json(errorObj("Please fill in all fields"));
      }

      if (title.length > 40) {
        return res.status(400).json(errorObj("Title has a limit of 40 characters."));
      }

      const markdown = useMarkdown(body);
      const newNote: NoteDoc = new NoteModel({
        user_id: req.userId,
        category_id: categoryId,
        title,
        body,
        markdown: markdown,
        shared: isTrue(shareable),
        locked: isTrue(locked),
      });
      await newNote.save();
      const notes = await NoteModel.find({ user_id: req.userId });

      return res.json({
        note: newNote,
        notes: parseLockedNotes(notes),
        status: "success",
      });
    }
    default: {
      return res.status(405).json({
        msg: "Method not allowed",
        error: true,
      });
    }
  }
}
