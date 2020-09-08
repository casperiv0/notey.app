import { Router, Response } from "express";
import { IRequest } from "../types";
import User, { IUser } from "../models/User.model";
import { compareSync, hashSync } from "bcrypt";
import { useToken, useAuth, useMarkdown } from "../hooks";
import { AuthUser } from "../interfaces";
import { logger } from "../utils/Logger";
import Note from "../models/Note.model";
import Category from "../models/Category.model";
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

  if (username && password) {
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        error: "user was not found",
        status: "error",
      });
    }

    const isPwCorrect = compareSync(password, user.password);

    if (!isPwCorrect) {
      return res.json({
        error: "password is incorrect",
        status: "error",
      });
    }

    const data: AuthUser = {
      _id: user._id,
      username: user.username,
    };

    const token = useToken(data, expires / 1000);

    res.cookie("__token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + expires),
    });

    return res.json({
      user: data,
      status: "success",
    });
  } else {
    return res.json({
      error: "Please fill in all fields",
      status: "error",
    });
  }
});

/**
 @Route POST /signup
 @Desc Create an account
*/
router.post("/signup", async (req: IRequest, res: Response) => {
  const { username, password, password2 } = req.body;

  if (username && password && password2) {
    if (password !== password2) {
      return res.json({
        error: "passwords do not match",
        status: "error",
      });
    }

    const user: any = await User.findOne({ username: username });

    if (user) {
      return res.json({ error: "username is already in use", status: "error" });
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
      logger.error(e, "db_error");
      return res.json({
        error: "Something went wrong signin up",
        status: "error",
      });
    }

    const data: AuthUser = {
      _id: newUser._id,
      username: newUser.username,
    };

    const token = useToken(data, 3600000);

    res.cookie("__token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
    });

    return res.json({
      user: data,
      status: "success",
    });
  } else {
    return res.json({ error: "Please fill in all fields", status: "error" });
  }
});

/**
 @Route GET /user
 @Desc Get information about the authenticated user
*/
router.post("/user", useAuth, async (req: IRequest, res: Response) => {
  const userId = req.user._id;
  let user;

  try {
    user = await User.findById(userId).select({ password: 0 });

    if (!user) {
      return res.json({
        server_error: "user not found",
        status: "error",
      });
    }
  } catch (e) {
    logger.error(e, "db_error");
    return res.json({
      server_error: "something went wrong",
      status: "error",
    });
  }

  return res.json({
    user,
    status: "success",
  });
});

router.get("/logout", useAuth, (req: IRequest, res: Response) => {
  res.clearCookie("__token", { httpOnly: true });

  return res.json({ status: "success" });
});

router.delete(
  "/delete-account",
  useAuth,
  async (req: IRequest, res: Response) => {
    const user = await User.findById(req.user.id);
    const notes = await Note.find({ user_id: user?._id });
    const categories = await Category.find({ user_id: user?._id });

    try {
      // delete all notes
      notes.forEach(async (note) => {
        await Note.findByIdAndDelete(note._id).catch((e) => console.log(e));
      });

      // Delete all categories
      categories.forEach(async (cat) => {
        await Category.findByIdAndDelete(cat._id).catch((e) => console.log(e));
      });

      // delete user
      await User.findByIdAndDelete(user?._id);
      res.clearCookie("__token", { httpOnly: true });
    } catch (e) {
      console.log(e);
    }

    res.json({ status: "success", msg: "account was deleted" });
  }
);

export default router;
