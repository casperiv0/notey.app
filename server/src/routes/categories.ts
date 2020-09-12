import { Router, Response } from "express";
import { IRequest } from "../types";
import Note from "../models/Note.model";
import { useAuth } from "../hooks";
import User from "../models/User.model";
import Category, { ICategory } from "../models/Category.model";
import Logger from "../utils/Logger";
const router: Router = Router();

/**
 * @Route GET /
 * @Desc Returns all the categories
 */
router.get("/", useAuth, async (req: IRequest, res: Response) => {
  let categories;

  try {
    categories = await Category.find({ user_id: req.user._id });
  } catch (e) {
    Logger.error(e, "db_error");
    return res.json({
      error: "Something went wrong getting the categories",
      status: "error",
    });
  }

  return res.json({ categories, status: "success" });
});

/**
 * @Route POST /
 * @Desc Creates a new category
 */
router.post("/", useAuth, async (req: IRequest, res: Response) => {
  const { name } = req.body;
  let categories;

  if (name) {
    if (name.length > 20) {
      return res.json({
        error: "Category name has a limit of 20 characters.",
        status: "error",
      });
    }

    const newCategory: ICategory = new Category({
      user_id: req.user._id,
      name,
    });

    try {
      await newCategory.save();
      categories = await Category.find({ user_id: req.user._id });
    } catch (e) {
      Logger.error(e, "db_error");
      return res.json({ error: "Something went wrong creating a category" });
    }

    return res.json({ categories, status: "success" });
  } else {
    return res.json({ error: "Please fill in all fields" });
  }
});

/**
 * @Route DELETE /:id
 * @Desc Deletes the requested category by id
 */
router.delete("/:id", useAuth, async (req: IRequest, res: Response) => {
  let user;
  let notes;
  let category;
  let categories;

  try {
    user = await User.findById(req.user._id);
    category = await Category.findById(req.params.id);

    if (user?._id.toString() !== category?.user_id.toString()) {
      return res
        .json({
          error: "Permission Denied",
          status: "error",
        })
        .status(401);
    } else {
      notes = await Note.find({ category_id: req.params.id });

      notes.forEach(async (note) => {
        await Note.findByIdAndUpdate(note._id, { category_id: "no_category" });
      });

      await Category.findByIdAndDelete(req.params.id);
    }

    notes = await Note.find({ user_id: req.user._id });
    categories = await Category.find({ user_id: req.user._id });
  } catch (e) {
    Logger.error(e, "db_error");
  }

  return res.json({
    status: "success",
    categories,
    notes,
  });
});

export default router;
