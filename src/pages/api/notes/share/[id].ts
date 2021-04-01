import { NextApiResponse } from "next";
import { IRequest } from "types/IRequest";
import { errorObj } from "@lib/utils";
import NoteModel, { NoteDoc } from "@models/Note.model";
import "@lib/database";

export default async function handler(req: IRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      try {
        const note: NoteDoc = await NoteModel.findById(query.id);

        if (!note) {
          return res.status(404).json(errorObj("not was not found"));
        }

        if (note?.locked) {
          return res.status(404).json(errorObj("not was not found"));
        }

        if (note.shared === false) {
          return res.status(404).json(errorObj("note was not found"));
        }

        return res.json({
          note,
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
