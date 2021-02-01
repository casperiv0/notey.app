import { Router, Response } from "express";
import { IRequest } from "../types";
import User, { IUser } from "../models/User.model";
import { compareSync, hashSync } from "bcryptjs";
import { useToken, useAuth, useMarkdown } from "../hooks";
import { AuthUser } from "../interfaces";
import Logger from "../utils/Logger";
import Note, { INote } from "../models/Note.model";
import Category, { ICategory } from "../models/Category.model";
import { errorObj } from "../utils/utils";
const router: Router = Router();

/**
 @Route POST /signin
 @Desc Sign in
*/
router.post("/signin", async (req: IRequest, res: Response) => {
  const { username, password, rememberMe } = req.body;
  let expires = 3600000; /** 1 hour */

  if (rememberMe) {
    expires = 2629800000; /** 30 days */
  }

  if (!username || !password) {
    return res.json(errorObj("Please fill in all fields")).status(400);
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.json(errorObj("User was not found")).status(400);
  }

  const isPwCorrect = compareSync(password, user.password);

  if (!isPwCorrect) {
    return res.json(errorObj("Password is incorrect")).status(401);
  }

  const data: AuthUser = {
    _id: user._id,
    username: user.username,
  };

  const token = useToken(data, expires / 1000);

  res.cookie("notey-session", token, {
    httpOnly: true,
    expires: new Date(Date.now() + expires),
  });

  return res.json({
    user: data,
    status: "success",
  });
});

/**
 @Route POST /signup
 @Desc Create an account
*/
router.post("/signup", async (req: IRequest, res: Response) => {
  const { username, password, password2 } = req.body;

  if (!username || !password || !password2) {
    return res.json(errorObj("Please fill in all fields")).status(400);
  }

  if (password !== password2) {
    return res.json(errorObj("Passwords do not match")).status(400);
  }

  const user = await User.findOne({ username: username });

  if (user) {
    return res.json(errorObj("Username is already in use")).status(400);
  }

  const hash = hashSync(password, 15);

  const newUser: IUser = new User({ username, password: hash });
  const welcomeBody =
    "# Welcome to notey.app!\n You can add `?create=note` or `?create=category` to simply create a note or category using the URL\n## Support\nYou can find notey.app on [GitHub](https://github.com/notey-app/notey.app)\n\n _feel free to delete this note and get started._";

  const firstNote = new Note({
    user_id: newUser._id,
    category_id: "no_category",
    title: "Note #1",
    body: welcomeBody,
    markdown: useMarkdown(welcomeBody),
  });

  try {
    await newUser.save();
    await firstNote.save();
  } catch (e) {
    Logger.error("db_error", e);
    return res.json(errorObj("Something went wrong signing up")).status(500);
  }

  const data: AuthUser = {
    _id: newUser._id,
    username: newUser.username,
  };

  const token = useToken(data, 3600000);

  res.cookie("notey-session", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 3600000),
  });

  return res.json({
    user: data,
    status: "success",
  });
});

router.post("/pin", useAuth, async (req: IRequest, res: Response) => {
  const { pin } = req.body;

  if (!pin) {
    return res.json(errorObj("PIN code is required"));
  }

  await User.findByIdAndUpdate(req.user?._id, {
    pin_code: hashSync(pin, 10),
  });
});

/**
 @Route GET /user
 @Desc Get information about the authenticated user
*/
router.post("/user", useAuth, async (req: IRequest, res: Response) => {
  const userId = req.user?._id;
  let user;

  try {
    user = await User.findById(userId).select({ password: 0 });

    if (!user) {
      return res.json(errorObj("user was not found")).status(400);
    }
  } catch (e) {
    Logger.error("db_error", e);
    return res.json(errorObj("Something went wrong")).status(500);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc: any = (user as any)._doc;
  return res.json({
    user: { ...doc, pin_code: user?.pin_code ? true : false },
    status: "success",
  });
});

router.get("/logout", useAuth, (_req: IRequest, res: Response) => {
  res.clearCookie("notey-session", { httpOnly: true });

  return res.json({ status: "success" });
});

router.delete("/delete-account", useAuth, async (req: IRequest, res: Response) => {
  const user = await User.findById(req.user?._id);
  const notes = await Note.find({ user_id: user?._id });
  const categories = await Category.find({ user_id: user?._id });

  try {
    // delete all notes
    notes.forEach(async (note: INote) => {
      await Note.findByIdAndDelete(note._id).catch((e: Error) => console.error(e));
    });

    // Delete all categories
    categories.forEach(async (cat: ICategory) => {
      await Category.findByIdAndDelete(cat._id).catch((e: Error) => console.error(e));
    });

    // delete user
    await User.findByIdAndDelete(user?._id);
    res.clearCookie("notey-session", { httpOnly: true });
  } catch (e) {
    Logger.error("DELETE_ACCOUNT", e);
  }

  res.json({ status: "success", msg: "account was deleted" });
});

router.post("/set-pin", useAuth, async (req: IRequest, res: Response) => {
  const { pin } = req.body;

  if (!pin) {
    return res.json(errorObj("PIN code is required"));
  }

  await User.findByIdAndUpdate(req.user?.id, { pin_code: hashSync(pin, 10) });

  res.json({
    status: "success",
  });
});

export default router;
