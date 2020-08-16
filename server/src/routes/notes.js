const router = require("express").Router();
const Note = require("../models/Note.model");
const User = require("../models/User.model");
const moment = require("moment");
const marked = require("marked");
const { isAuth } = require("../utils/functions");

router.get("/", isAuth, async (req, res) => {
  const notes = await Note.find({ user_id: req.user.id }).catch((e) =>
    console.log(e)
  );

  return res.json({ notes, status: "success" });
});

router.get("/:noteId", isAuth, async (req, res) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId).catch((e) => console.log(e));

  return res.json({ note, status: "success" });
});

router.put("/:noteId", isAuth, async (req, res) => {
  const note = await Note.findById(req.params.noteId);
  const user = await User.findById(req.user.id);

  console.log(note._id);
  console.log(user.last_active_note);
  user.last_active_note = note._id;

  try {
    await user.save();
    const notes = await Note.find({ user_id: req.user.id });

    return res.json({ msg: "Updated", status: "success", notes });
  } catch (e) {
    console.log(e);
    return res.json({ error: "Something went wrong", status: "error" });
  }
});

router.put("/update/:noteId", isAuth, async (req, res) => {
  const { title, body } = req.body;
  const note = await Note.findById(req.params.noteId).catch((e) =>
    console.log(e)
  );
  const active = req.query.active;

  // Update all notes to false, removes conflicting
  // if (active !== note.active.toString()) {
  Note.find().then((notes) => {
    notes.forEach((note) => {
      note.active = "false";
    });
  });
  // }

  note.active = active;
  note.title = title;
  note.body = body;

  try {
    await note.save();

    return res.json({ msg: "Updated", status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ error: "Something went wrong", status: "error" });
  }
});

router.post("/", isAuth, async (req, res) => {
  const { title, body } = req.body;

  if (title && body) {
    if (title.length > 40) {
      return res.json({
        error: "Title has a limit of 40 characters.",
        status: "error",
      });
    }

    const created_at = moment().format("MM/DD/YYYY");

    const newNote = new Note({
      user_id: req.user.id,
      title,
      body: marked(body),
      created_at,
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
