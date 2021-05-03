import {
  createHandler,
  Post,
  BadRequestException,
  NotFoundException,
  Body,
  Res,
  Req,
  Delete,
} from "@storyofams/next-api-decorators";
import { NextApiRequest, NextApiResponse } from "next";
import { compareSync, hashSync } from "bcryptjs";
import useToken from "@hooks/useToken";
import UserModel from "src/models/User.model";
import { Cookie } from "@lib/constants";
import useCookie from "src/hooks/useCookie";
import "@lib/database";
import useMarkdown from "@hooks/useMarkdown";
import NoteModel from "@models/Note.model";
import { IRequest } from "types/IRequest";
import CategoryModel from "@models/Category.model";
import { ErrorMessages } from "@lib/errors";
import { AuthGuard } from "@lib/middlewares";

class AuthenticationApiManager {
  @Post("/login")
  async login(@Body() body: NextApiRequest["body"], @Res() res: NextApiResponse) {
    const { username, password, rememberMe } = body;

    const expires = rememberMe ? Cookie.RememberMeExpires : Cookie.Expires;

    if (!username || !password) {
      throw new BadRequestException(ErrorMessages.ALL_FIELDS);
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("user"));
    }

    const isPwCorrect = compareSync(password, user.password);

    if (!isPwCorrect) {
      throw new BadRequestException(ErrorMessages.PW_INCORRECT);
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
  }

  @Post("/register")
  async register(@Body() body: NextApiRequest["body"], @Res() res: NextApiResponse) {
    const { username, password, password2 } = body;

    if (!username || !password) {
      throw new BadRequestException(ErrorMessages.ALL_FIELDS);
    }

    if (password !== password2) {
      throw new BadRequestException(ErrorMessages.PW_NOT_MATCH);
    }

    const user = await UserModel.findOne({ username: username });
    if (user) {
      throw new BadRequestException(ErrorMessages.USERNAME_IN_USE);
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
  }

  @Post("/logout")
  async logout(@Res() res: NextApiResponse) {
    useCookie(res, "notey-session", "", 0);

    return res.json({
      user: null,
      status: "success",
    });
  }

  @Post("/me")
  @AuthGuard()
  async getMe(@Req() req: IRequest) {
    const user = await UserModel.findById(req.userId).select({ password: 0 });

    if (!user) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("user"));
    }

    return {
      user: {
        ...user.toJSON(),
        pin_code: !!user.pin_code,
      },
      status: "success",
    };
  }

  @Delete("/me")
  @AuthGuard()
  async deleteMe(@Req() req: IRequest, @Res() res: NextApiResponse) {
    const user = await UserModel.findById(req.userId);

    await NoteModel.deleteMany({ user_id: user._id });
    await CategoryModel.deleteMany({ user_id: user._id });
    await UserModel.findByIdAndDelete(user._id);
    useCookie(res, "notey-session", "", 0);

    return { user: null, status: "success" };
  }
}

export default createHandler(AuthenticationApiManager);
