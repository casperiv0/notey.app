import { Router, Response } from "express";
import { IRequest } from "../types";
import Note from "../models/Note.model";
import { useAuth } from "../hooks";
import User from "../models/User.model";
import Category, { ICategory } from "../models/Category.model";
import Logger from "../utils/Logger";
import { errorObj } from "../utils/utils";
const router: Router = Router();

/**
 * @Route GET /
 * @Desc Returns all the categories
 */
router.get("/", useAuth, async (req: IRequest, res: Response) => {
  let categories;

  try {
    categories = await Category.find({ user_id: req.user?._id });
  } catch (e) {
    Logger.error("db_error", e);
    return res.json(errorObj("Something went wrong")).status(500);
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

  if (!name) {
    return res.json(errorObj("Please fill in all fields")).status(400);
  }

  if (name.length > 20) {
    return res
      .json(errorObj("Category name has a limit of 20 characters."))
      .status(400);
  }

  const newCategory: ICategory = new Category({
    user_id: req.user?._id,
    name,
  });

  try {
    await newCategory.save();
    categories = await Category.find({ user_id: req.user?._id });
  } catch (e) {
    Logger.error("db_error", e);
    return res
      .json(errorObj("Something went wrong creating the category"))
      .status(500);
  }

  return res.json({ categories, status: "success" });
});

/**
 * @Route DELETE /:id
 * @Desc Deletes the requested category by id
 */
router.delete("/:id", useAuth, async (req: IRequest, res: Response) => {
  try {
    let notes;
    const user = await User.findById(req.user?._id);
    const category = await Category.findById(req.params.id);

    if (user?._id.toString() !== category?.user_id.toString()) {
      return res.json(errorObj("Permission Denied")).status(401);
    }

    notes = await Note.find({ category_id: req.params.id });

    notes.forEach(async (note) => {
      await Note.findByIdAndUpdate(note._id, { category_id: "no_category" });
    });

    await Category.findByIdAndDelete(req.params.id);

    const categories = await Category.find({ user_id: req.user?._id });
    notes = await Note.find({ user_id: req.user?._id });

    return res.json({
      status: "success",
      categories,
      notes,
    });
  } catch (e) {
    Logger.error("db_error", e);
  }
});

export default router;
