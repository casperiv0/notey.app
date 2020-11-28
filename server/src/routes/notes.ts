import { Router, Response } from "express";
import { IRequest } from "../types";
import Note, { INote } from "../models/Note.model";
import useAuth from "../hooks/useAuth";
import useMarkdown from "../hooks/useMarkdown";
import User from "../models/User.model";
import Logger from "../utils/Logger";
import { errorObj, isTrue } from "../utils/utils";
import { compareSync } from "bcryptjs";
const router: Router = Router();

const lockedMsg =
  "Note is locked with a PIN code. Please enter your pincode in the popup";

function parseLockedNotes(notes: INote[]) {
  return notes.map((note: INote) => {
    if (note.locked === true) {
      note.body = lockedMsg;
      note.markdown = lockedMsg;
    }
    return note;
  });
}

/**
 * @Route GET /
 * @Desc Returns all notes by the authenticated user
 */
router.get("/", useAuth, async (req: IRequest, res: Response) => {
  const notes = await Note.find({ user_id: req.user?._id });

  return res.json({ notes: parseLockedNotes(notes), status: "success" });
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
    return res.json({ ...errorObj("pin_required"), _id: note._id });
  }

  if (note?.locked && pin) {
    const isCorrect = compareSync(pin, String(user?.pin_code));

    if (!isCorrect) {
      return res.json(errorObj("PIN was incorrect")).status(400);
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

  if (!categoryId || !title || !body) {
    return res.json(errorObj("Please fill in all fields")).status(400);
  }

  const markdown = useMarkdown(body);
  let notes;
  let note;

  if (markdown === "" || !markdown) {
    return res
      .json(errorObj("Please do not include any malicious code."))
      .status(400);
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
    Logger.error("db_error", e);
    return res.json(errorObj("Something went wrong updating the note"));
  }

  return res.json({
    notes: parseLockedNotes(notes),
    note: note,
    status: "success",
  });
});

/**
 * @Route POST /
 * @Desc Creates a new note
 */
router.post("/", useAuth, async (req: IRequest, res: Response) => {
  const { categoryId, title, body, shareable, locked } = req.body;

  if (!categoryId || !title || !body) {
    return res.json(errorObj("Please fill in all fields")).status(400);
  }

  if (title.length > 40) {
    return res
      .json(errorObj("Title has a limit of 40 characters."))
      .status(400);
  }

  try {
    const markdown = useMarkdown(body);

    if (markdown === "" || !markdown) {
      return res
        .json(errorObj("Please do not include any malicious code."))
        .status(400);
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = (newNote as any)._doc;
    return res.json({
      note: {
        ...doc,
        markdown: lockedMsg,
        body: lockedMsg,
      },
      notes: parseLockedNotes(notes),
      status: "success",
    });
  } catch (e) {
    Logger.error("CREATE_NOTE", e);
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
      notes: parseLockedNotes(notes),
      status: "success",
    });
  } catch (e) {
    Logger.error("db_error", e);
    return res.json(errorObj("Something went wrong")).status(500);
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
        return res.json(errorObj("Permissions Denied")).status(401);
      }

      await Note.findByIdAndUpdate(noteId, {
        shared: isTrue(shareable),
        locked: isTrue(locked),
      });
      const notes = await Note.find({ user_id: req.user?._id });
      const updated = await Note.findById(note?._id);

      return res.json({
        status: "success",
        notes: parseLockedNotes(notes),
        note: updated,
      });
    } catch (e) {
      Logger.error("db_error", e);
      return res.json(errorObj("Something went wrong")).status(400);
    }
  }
);

router.get("/share/:noteId", async (req: IRequest, res: Response) => {
  const noteId = req.params.noteId;

  try {
    const note = await Note.findById(noteId);

    if (!note?.id) {
      return res.json(errorObj("Share was not found")).status(404);
    }

    if (note.locked === true) {
      return res.json(
        errorObj("Share is locked, therefore you cannot view it")
      );
    }

    if (!note?.shared) {
      return res.json(errorObj("Share was not found")).status(404);
    }

    return res.json({
      status: "success",
      note,
    });
  } catch (e) {
    Logger.error("db_error", e);
    return res.json(errorObj("Share was not found")).status(404);
  }
});

export default router;
