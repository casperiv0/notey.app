const router = require("express").Router();
const Note = require("../models/Note.model");
const User = require("../models/User.model");
const createDomPurify = require("dompurify");
const marked = require("marked");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const { isAuth } = require("../utils/functions");

router.get("/", isAuth, async (req, res) => {
  const notes = await Note.find({ user_id: req.user.id }).catch((e) =>
    console.log(e)
  );

  return res.json({ notes, status: "success" });
});

router.get("/:noteId", isAuth, async (req, res) => {
  const noteId = req.params.noteId;
  let note;
  let user;

  try {
    note = await Note.findById(noteId);
    user = await User.findById(req.user.id);
  } catch (e) {
    note = undefined;
  }

  if (note && note.user_id.toString() !== user._id.toString()) {
    note = undefined;
  }

  return res.json({ note, status: "success" });
});

router.put("/:noteId", isAuth, async (req, res) => {
  const { title, body, categoryId } = req.body;
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  const markdown = dompurify.sanitize(marked(body));

  if (markdown === "" || !markdown) {
    return res.json({
      error: "Please do not include any malicious code.",
      status: "error",
    });
  }

  try {
    note.category_id = categoryId;
    note.title = title;
    note.body = body;
    note.markdown = markdown;

    await note.save();

    const notes = await Note.find({ user_id: req.user.id });

    return res.json({ msg: "Updated", status: "success", note, notes });
  } catch (e) {
    console.log(e);
    return res.json({ error: "Something went wrong", status: "error" });
  }
});

router.post("/", isAuth, async (req, res) => {
  const { title, body, categoryId } = req.body;

  if (title && body && categoryId) {
    if (title.length > 40) {
      return res.json({
        error: "Title has a limit of 40 characters.",
        status: "error",
      });
    }

    const markdown = dompurify.sanitize(marked(body));

    if (markdown === "" || !markdown) {
      return res.json({
        error: "Please do not include any malicious  code.",
        status: "error",
      });
    }

    const newNote = new Note({
      user_id: req.user.id,
      title,
      body,
      markdown,
      category_id: categoryId,
    });

    try {
      await newNote.save();
      const notes = await Note.find({ user_id: req.user.id });

      return res.json({ notes, note: newNote, status: "success" });
    } catch (e) {
      console.log(e);
      return res.json({ error: "Something went wrong", status: "error" });
    }
  } else {
    return res.json({ error: "Please fill in all fields", status: "error" });
  }
});

router.delete("/:noteId", isAuth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.noteId);
    const notes = await Note.find({ user_id: req.user.id });

    return res.json({ msg: "Deleted", status: "success", notes });
  } catch (e) {
    console.log(e);
    return res.json({ error: "Something went wrong!", status: "error" });
  }
});

module.exports = router;
