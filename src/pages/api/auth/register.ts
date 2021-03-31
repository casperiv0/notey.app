import { NextApiResponse } from "next";
import { hashSync } from "bcryptjs";
import useToken from "@hooks/useToken";
import useMarkdown from "@hooks/useMarkdown";
import { IRequest } from "types/IRequest";
import { errorObj } from "@lib/utils";
import UserModel from "src/models/User.model";
import { Cookie } from "@lib/constants";
import useCookie from "src/hooks/useCookie";
import NoteModel from "@models/Note.model";
import "@lib/database";

export default async function handler(req: IRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST": {
      try {
        const { username, password, password2 } = req.body;

        if (!username || !password || !password2) {
          return res.status(400).json(errorObj("Please fill in all fields"));
        }

        if (password !== password2) {
          return res.status(400).json(errorObj("Passwords do not match"));
        }

        const user = await UserModel.findOne({ username: username });

        if (user) {
          return res.status(400).json(errorObj("Username is already in use"));
        }

        const hash = hashSync(password, 15);

        const newUser = new UserModel({ username, password: hash });
        const welcomeBody =
          "# Welcome to notey.app!\n You can add `?create=note` or `?create=category` to simply create a note or category using the URL\n## Support\nYou can find notey.app on [GitHub](https://github.com/dev-caspertheghost/notey.app)\n\n _feel free to delete this note and get started._";

        const firstNote = new NoteModel({
          user_id: newUser._id,
          category_id: "no_category",
          title: "Note #1",
          body: welcomeBody,
          markdown: useMarkdown(welcomeBody),
        });

        await newUser.save();
        await firstNote.save();

        const token = useToken(newUser._id, 3600000);
        useCookie(res, "notey-session", token, Cookie.Expires);

        return res.json({
          user: {
            _id: newUser._id,
            username: newUser.username,
          },
          status: "success",
        });
      } catch (e) {
        console.error(e);

        return res.status(500).json({
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
