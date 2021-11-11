import {
  createHandler,
  Post,
  BadRequestException,
  NotFoundException,
  Body,
  Res,
  Delete,
  UseMiddleware,
  Put,
} from "@storyofams/next-api-decorators";
import { NextApiRequest, NextApiResponse } from "next";
import { compareSync, hashSync } from "bcryptjs";
import { validateSchema } from "@casper124578/utils";
import { signToken, setCookie, sanitizeUserMarkdown } from "lib/server";
import UserModel, { baseSchema, registerSchema } from "src/models/User.model";
import { Cookie } from "lib/constants";
import "lib/database";
import NoteModel from "models/Note.model";
import CategoryModel from "models/Category.model";
import { ErrorMessages } from "lib/errors";
import { AuthGuard, CookieParser, Cors, Helmet, UserId } from "lib/middlewares";

@UseMiddleware(Cors, CookieParser, Helmet)
class AuthenticationApiManager {
  @Post("/login")
  async login(@Body() body: NextApiRequest["body"], @Res() res: NextApiResponse) {
    const { username, password, rememberMe } = body;
    const expires = rememberMe ? Cookie.RememberMeExpires : Cookie.Expires;

    const [error] = await validateSchema(baseSchema, { username, password });
    if (error) {
      throw new BadRequestException(error.message, error.errors);
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("user"));
    }

    const isPwCorrect = compareSync(password, user.password);

    if (!isPwCorrect) {
      throw new BadRequestException(ErrorMessages.PW_INCORRECT);
    }

    const token = signToken(user._id, expires / 1000);
    setCookie({ res, name: "notey-session", value: token, expires });

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

    const [error] = await validateSchema([baseSchema, registerSchema], {
      username,
      password,
      password2,
    });
    if (error) {
      throw new BadRequestException(error.message, error.errors);
    }

    if (password !== password2) {
      throw new BadRequestException(ErrorMessages.PW_NOT_MATCH);
    }

    const user = await UserModel.findOne({ username });
    if (user) {
      throw new BadRequestException(ErrorMessages.USERNAME_IN_USE);
    }

    const hash = hashSync(password, 15);

    const newUser = new UserModel({ username, password: hash });
    const welcomeBody =
      "# Welcome to notey.app!\nFeel free to give Notey.app a [star on GitHub too!](https://github.com/dev-caspertheghost/notey.app) \n## Support\nYou can find notey.app on [GitHub](https://github.com/dev-caspertheghost/notey.app)\n\n _feel free to delete this note to started._";

    const firstNote = new NoteModel({
      user_id: newUser._id,
      category_id: "no_category",
      title: "Note #1",
      body: welcomeBody,
      markdown: sanitizeUserMarkdown(welcomeBody),
    });

    await newUser.save();
    await firstNote.save();

    const token = signToken(newUser._id, 3600000);
    setCookie({ res, name: "notey-session", value: token, expires: Cookie.Expires });

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
    setCookie({ res, name: "notey-session", value: "", expires: 0 });

    return res.json({
      user: null,
      status: "success",
    });
  }

  @Post("/me")
  @AuthGuard()
  async getMe(@UserId() userId: string) {
    const user = await UserModel.findById(userId).select({ password: 0 });

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
  async deleteMe(@UserId() userId: string, @Res() res: NextApiResponse) {
    const user = await UserModel.findById(userId);

    await NoteModel.deleteMany({ user_id: user._id });
    await CategoryModel.deleteMany({ user_id: user._id });
    await UserModel.findByIdAndDelete(user._id);

    setCookie({ res, name: "notey-session", value: "", expires: 0 });

    return { user: null, status: "success" };
  }

  @Put("/me/pin")
  @AuthGuard()
  async updatePinCode(@UserId() userId: string, @Body() body: any) {
    if (!body.pin) {
      throw new BadRequestException("`pin` code is required");
    }

    await UserModel.findByIdAndUpdate(userId, { pin_code: hashSync(body.pin, 10) });

    return { status: "success" };
  }
}

export default createHandler(AuthenticationApiManager);
