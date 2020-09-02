import { Router, Response } from "express";
import { IRequest } from "../types";
import User from "../models/User.model";
import { compareSync } from "bcrypt";
import { useToken } from "../hooks";
const router: Router = Router();

router.post("/signin", async (req: IRequest, res: Response) => {
  const { username, password, rememberMe } = req.body;
  let expires = 3600000; /** 1 hour */

  if (rememberMe) {
    expires = 2629800000; /** 30 days */
  }

  if (username && password) {
    const user: any = await User.findOne({ username }).catch((e) =>
      console.log(e)
    );

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

    const data = {
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

export default router;
