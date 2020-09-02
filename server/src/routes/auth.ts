import { Router, Response } from "express";
import { IRequest } from "../types";
import User, { IUser } from "../models/User.model";
import { compareSync, hashSync } from "bcrypt";
import { useToken } from "../hooks";
import { AuthUser } from "../interfaces";
const router: Router = Router();

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

    try {
      await newUser.save();
    } catch (e) {
      console.log(e);
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

export default router;
