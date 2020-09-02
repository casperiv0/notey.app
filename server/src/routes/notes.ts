import { Router, Response } from "express";
import { IRequest } from "../types";
import Note, { INote } from "../models/Note.model";
import useAuth from "../hooks/useAuth";
import useMarkdown from "../hooks/useMarkdown";
const router: Router = Router();

router.get("/", useAuth, async (req: IRequest, res: Response) => {
  const notes = await Note.find({ user_id: "5f36785367c1a232509cbc37" });

  return res.json({ notes });
});

router.post("/", useAuth, async (req: IRequest, res: Response) => {
  const { categoryId, title, body } = req.body;

  if (title && body) {
    const newNote: INote = new Note({
      user_id: req.user._id,
      category_id: categoryId,
      title,
      body,
      markdown: useMarkdown(body),
    });

    newNote.save();
  } else {
    return res.json({ error: "Please fill in all fields", status: "error" });
  }
});

export default router;
