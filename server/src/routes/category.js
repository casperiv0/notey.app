const router = require("express").Router();
const Note = require("../models/Note.model");
const moment = require("moment");
const Category = require("../models/Category.model");
const { isAuth } = require("../utils/functions");

router.get("/", isAuth, async (req, res) => {
  let categories;

  try {
    categories = await Category.find({ user_id: req.user.id });
  } catch (e) {
    console.log(e);
    return res.json({
      error: "Something went wrong getting the categories",
      status: "error",
    });
  }

  return res.json({ categories, status: "success" });
});

router.post("/", isAuth, async (req, res) => {
  const { name } = req.body;
  const created_at = moment().format("MM/DD/YYYY");
  let categories;

  if (name) {
    const newCategory = new Category({
      user_id: req.user.id,
      created_at,
      name,
    });

    try {
      await newCategory.save();
      categories = await Category.find({ user_id: req.user.id });
    } catch (e) {
      console.log(e);
      return res.json({ error: "Something went wrong creating a category" });
    }

    return res.json({ msg: "Created", categories, status: "success" });
  } else {
    return res.json({ error: "Please fill in all fields", status: "error" });
  }
});

router.delete("/:id", isAuth, async (req, res) => {
  const catId = req.params.id;

  try {
    const notesByCat = await Note.find({
      user_id: req.user.id,
      category_id: catId,
    });

    notesByCat.forEach(async (note) => {
      await Note.findByIdAndUpdate(note._id, { category_id: "no_category" });
    });

    await Category.findByIdAndDelete(catId);
    const categories = await Category.find({ user_id: req.user.id });

    return res.json({ status: "success", categories });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
