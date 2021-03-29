import { NextApiResponse } from "next";
import { compareSync } from "bcryptjs";
import useToken from "@hooks/useToken";
import { IRequest } from "types/IRequest";
import { errorObj } from "@lib/utils";
import UserModel from "src/models/User.model";
import { Cookie } from "@lib/constants";
import useCookie from "src/hooks/useCookie";
import "@lib/database";

export default async function handler(req: IRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST": {
      try {
        const { username, password, rememberMe } = req.body;

        const expires = rememberMe ? Cookie.RememberMeExpires : Cookie.Expires;

        if (!username || !password) {
          return res.status(400).json(errorObj("Please fill in all fields"));
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
          return res.status(400).json(errorObj("User was not found"));
        }

        const isPwCorrect = compareSync(password, user.password);

        if (!isPwCorrect) {
          return res.status(401).json(errorObj("Password is incorrect"));
        }

        const token = useToken(user._id, expires / 1000);
        useCookie(res, "notey-session", token, expires);

        return res.json({
          user: {
            _id: user._id,
            username: user.username,
          },
          status: "success",
        });
      } catch (e) {
        console.error(e);

        return res.json({
          error: "An unexpected error occurred",
          status: "error",
        });
      }
    }
    default: {
      return res.status(405).json({
        msg: "Method not allowed",
        error: true,
      });
    }
  }
}
