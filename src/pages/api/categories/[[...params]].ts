import {
  createHandler,
  Post,
  BadRequestException,
  NotFoundException,
  Body,
  Delete,
  Get,
  Put,
  Param,
  HttpException,
  UseMiddleware,
} from "@storyofams/next-api-decorators";
import { validateSchema } from "@casper124578/utils";
import "@lib/database";
import NoteModel, { NoteDoc } from "@models/Note.model";
import { IRequest } from "types/IRequest";
import CategoryModel, { createAndUpdateCategoryValidation } from "@models/Category.model";
import { isTrue, parseLockedNotes } from "@lib/utils";
import { ObjectId } from "mongoose";
import { ErrorMessages } from "@lib/errors";
import { AuthGuard, CookieParser, Cors, Helmet, RateLimit, UserId } from "@lib/middlewares";

@UseMiddleware(Cors, CookieParser, RateLimit, Helmet)
class CategoriesApiManager {
  private _getUserCategories(userId: ObjectId) {
    return CategoryModel.find({ user_id: userId });
  }

  @Get()
  @AuthGuard()
  async getUserCategories(@UserId() userId: ObjectId) {
    const categories = await this._getUserCategories(userId);

    return {
      categories,
      status: "success",
    };
  }

  @Post()
  @AuthGuard()
  async createCategory(@Body() body: IRequest["body"], @UserId() userId: ObjectId) {
    const { name } = body;

    const [error] = await validateSchema(createAndUpdateCategoryValidation, { name });
    if (error) {
      throw new BadRequestException(error.message, error.errors);
    }

    const category = new CategoryModel({
      user_id: userId,
      name,
    });

    await category.save();

    const categories = await this._getUserCategories(userId);
    return {
      categories,
      status: "success",
    };
  }

  @Put("/:id")
  @AuthGuard()
  async updateCategory(
    @Body() body: IRequest["body"],
    @Param("id") id: string,
    @UserId() userId: ObjectId,
  ) {
    const { name, folded } = body;

    const [error] = await validateSchema(createAndUpdateCategoryValidation, { name });
    if (error) {
      throw new BadRequestException(error.message, error.errors);
    }

    const category = await CategoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("category"));
    }

    if (folded !== undefined) {
      category.folded = isTrue(folded);
    }

    category.name = name;
    await category.save();

    const categories = await this._getUserCategories(userId);
    return {
      categories,
      status: "success",
    };
  }

  @Delete("/:id")
  @AuthGuard()
  async deleteCategory(@Param("id") id: string, @UserId() userId: ObjectId) {
    const category = await CategoryModel.findById(id);

    if (!category) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("category"));
    }

    if (userId.toString() !== category?.user_id?.toString()) {
      throw new HttpException(403, ErrorMessages.PERMISSION_DENIED);
    }

    const notes = await NoteModel.find({ category_id: id, user_id: userId });

    await Promise.all(
      notes.map(async (note: NoteDoc) => {
        note.category_id = "no_category";
        await note.save();
      }),
    );

    await CategoryModel.findByIdAndDelete(id);

    const categories = await this._getUserCategories(userId);
    const updatedNotes = await NoteModel.find({ user_id: userId });

    return {
      categories,
      notes: parseLockedNotes(updatedNotes),
      status: "success",
    };
  }
}

export default createHandler(CategoriesApiManager);
