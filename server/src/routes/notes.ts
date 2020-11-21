import { Router, Response } from "express";
import { IRequest } from "../types";
import Note, { INote } from "../models/Note.model";
import useAuth from "../hooks/useAuth";
import useMarkdown from "../hooks/useMarkdown";
import User from "../models/User.model";
import Logger from "../utils/Logger";
import { isTrue } from "../utils/utils";
import { compareSync } from "bcrypt";
const router: Router = Router();

/**
 * @Route GET /
 * @Desc Returns all notes by the authenticated user
 */
router.get("/", useAuth, async (req: IRequest, res: Response) => {
  const notes = await Note.find({ user_id: req.user?._id });

  const parsedNotes = notes.map((note) => {
    if (note.locked) {
      const msg =
        "Note is locked with a PIN code. Please enter your pincode in the popup";
      note.body = msg;
      note.markdown = msg;
    }
    return note;
  });

  return res.json({ notes: parsedNotes, status: "success" });
});

/**
 * @Route GET /:noteId
 * @Desc Returns the requested note
 */
router.post("/:noteId", useAuth, async (req: IRequest, res: Response) => {
  const { noteId } = req.params;
  const { pin } = req.body;
  let note;
  let user;

  try {
    note = await Note.findById(noteId);
    user = await User.findById(req.user?._id);
  } catch (e) {
    note = (await Note.find({ user_id: req.user?._id }))[0];
  }

  if (note?.locked === true && !pin) {
    return res.json({
      error: "pin_required",
      status: "error",
      _id: note._id,
    });
  }

  if (note?.locked && pin) {
    const isCorrect = compareSync(pin, String(user?.pin_code));

    if (!isCorrect) {
      return res.json({
        error: "PIN was incorrect",
        status: "error",
      });
    }
  }

  if (note?.user_id.toString() !== user?._id.toString()) {
    note = (await Note.find({ user_id: req.user?._id }))[0];
  }

  return res.json({ note, status: "success" });
});

/**
 * @Route PUT /:noteId
 * @Desc Updates a note by the requested id
 */
router.put("/:noteId", useAuth, async (req: IRequest, res: Response) => {
  const { noteId } = req.params;
  const { categoryId, title, body } = req.body;
  const markdown = useMarkdown(body);
  let notes;
  let note;

  if (markdown === "" || !markdown) {
    return res.json({
      error: "Please do not include any malicious code.",
      status: "error",
    });
  }

  try {
    await Note.findByIdAndUpdate(noteId, {
      title,
      category_id: categoryId,
      body,
      markdown,
    });

    note = await Note.findById(noteId);
    notes = await Note.find({ user_id: req.user?._id });
  } catch (e) {
    Logger.error(e, "db_error");
    return res.json({
      error: "Something went wrong updating the note",
      status: "error",
    });
  }

  return res.json({ notes, note, status: "success" });
});

/**
 * @Route POST /
 * @Desc Creates a new note
 */
router.post("/", useAuth, async (req: IRequest, res: Response) => {
  const { categoryId, title, body, shareable, locked } = req.body;

  if (categoryId && title && body) {
    if (title.length > 40) {
      return res.json({
        error: "Title has a limit of 40 characters.",
        status: "error",
      });
    }

    const markdown = useMarkdown(body);

    if (markdown === "" || !markdown) {
      return res.json({
        error: "Please do not include any malicious  code.",
        status: "error",
      });
    }

    const newNote: INote = new Note({
      user_id: req.user?._id,
      category_id: categoryId,
      title,
      body,
      markdown: markdown,
      shared: isTrue(shareable),
      locked: isTrue(locked),
    });
    const notes = await Note.find({ user_id: req.user?.id });

    newNote.save();

    return res.json({ note: newNote, notes, status: "success" });
  } else {
    return res.json({ error: "Please fill in all fields", status: "error" });
  }
});

/**
 * @Route DELETE /:noteId
 * @Desc Deletes a note by the requested id
 */
router.delete("/:noteId", useAuth, async (req: IRequest, res: Response) => {
  const { noteId } = req.params;
  let note;
  let notes;

  try {
    note = await Note.findById(noteId);
    notes = await Note.find({ user_id: req.user?._id });

    if (note?.user_id.toString() !== req.user?._id.toString()) {
      return res
        .json({
          error: "Permission denied.",
          status: "error",
        })
        .status(401);
    }

    await Note.findByIdAndDelete(noteId);
    notes = await Note.find({ user_id: req.user?._id });

    return res.json({
      notes,
      status: "success",
    });
  } catch (e) {
    Logger.error(e, "db_error");
    return res.json({ error: "Something went wrong!", status: "error" });
  }
});

/**
 * @Route POST /options/:noteId
 * @Desc updates misc settings for note
 */
router.post(
  "/options/:noteId",
  useAuth,
  async (req: IRequest, res: Response) => {
    const noteId = req.params.noteId;
    const { shareable, locked } = req.body;

    try {
      const note = await Note.findById(noteId);

      if (note?.user_id.toString() !== req.user?._id.toString()) {
        return res
          .json({
            error: "Permission denied.",
            status: "error",
          })
          .status(401);
      }

      await Note.findByIdAndUpdate(noteId, {
        shared: isTrue(shareable),
        locked: isTrue(locked),
      });
      const notes = await Note.find({ user_id: req.user?._id });
      const updated = await Note.findById(note?._id);

      return res.json({
        status: "success",
        notes,
        note: updated,
      });
    } catch (e) {
      Logger.error(e, "db_error");
      return res.json({ error: "Something went wrong!", status: "error" });
    }
  }
);

router.get("/share/:noteId", async (req: IRequest, res: Response) => {
  const noteId = req.params.noteId;

  try {
    const note = await Note.findById(noteId);

    if (!note?.id) {
      return res.json({
        error: "Share not found",
        status: "error",
      });
    }

    if (!note?.shared) {
      return res.json({
        error: "Share was not found",
        status: "error",
      });
    }

    return res.json({
      status: "success",
      note,
    });
  } catch (e) {
    Logger.error(e, "db_error");
    return res.json({
      error: "Share not found",
      status: "error",
    });
  }
});

export default router;
