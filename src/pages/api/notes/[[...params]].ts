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
  Query,
  UseMiddleware,
} from "@storyofams/next-api-decorators";
import "lib/database";
import { validateSchema } from "@casper124578/utils";
import NoteModel, { NoteDoc, createOrUpdateNoteSchema } from "models/Note.model";
import { IRequest } from "types/IRequest";
import { isTrue, parseLockedNotes } from "lib/utils";
import { isValidObjectId, ObjectId } from "mongoose";
import useMarkdown from "@hooks/useMarkdown";
import { ErrorMessages } from "lib/errors";
import { AuthGuard, CookieParser, Cors, Helmet, RateLimit, UserId } from "lib/middlewares";
import UserModel from "models/User.model";
import { compareSync } from "bcryptjs";
import { LOCKED_NOTE_MSG } from "lib/constants";

function returnLockedNote(note: NoteDoc) {
  return {
    ...note.toJSON(),
    // make sure these values are hidden
    __v: undefined,
    category_id: undefined,
    user_id: undefined,
    shared: undefined,
    created_at: undefined,
    body: LOCKED_NOTE_MSG,
    markdown: LOCKED_NOTE_MSG,
  };
}

@UseMiddleware(Cors, CookieParser, RateLimit, Helmet)
class NotesApiManager {
  private async _getUserNotes(userId: ObjectId): Promise<NoteDoc[]> {
    return NoteModel.find({ user_id: userId });
  }

  private async returnNoteIfNotFound(userId: ObjectId): Promise<NoteDoc[]> {
    return NoteModel.find({ user_id: userId }).limit(1);
  }

  @Get()
  @AuthGuard()
  async getUserNotes(@UserId() userId: ObjectId, @Query("lastId") lastId: string) {
    let notes = await this._getUserNotes(userId);

    if (lastId) {
      const lastNote = notes.findIndex((n) => n._id.toString() === lastId);
      notes = notes.splice(0, lastNote);
    }

    return {
      notes: parseLockedNotes(notes),
      status: "success",
    };
  }

  @Post()
  @AuthGuard()
  async createNote(@Body() body: IRequest["body"], @UserId() userId: ObjectId) {
    const { category_id, title, body: noteBody, shareable, locked } = body;

    const [error] = await validateSchema(createOrUpdateNoteSchema, {
      category_id,
      title,
      body: noteBody,
      shareable,
      locked,
    });
    if (error) {
      throw new BadRequestException(error.message, error.errors);
    }

    const markdown = useMarkdown(noteBody);
    const newNote: NoteDoc = new NoteModel({
      user_id: userId,
      category_id,
      title,
      body: noteBody,
      markdown,
      shared: isTrue(shareable),
      locked: isTrue(locked),
    });
    await newNote.save();
    const notes = await this._getUserNotes(userId);

    return {
      note: newNote,
      notes: parseLockedNotes(notes),
      status: "success",
    };
  }

  @Post("/:id")
  @AuthGuard()
  async getNoteById(@Param("id") id: string, @UserId() userId: ObjectId, @Body() body: any) {
    if (!isValidObjectId(id)) {
      const [note]: NoteDoc[] | undefined = await this.returnNoteIfNotFound(userId);

      if (note?.locked) {
        return {
          status: "error",
          pin_required: true,
          note: returnLockedNote(note),
        };
      }

      return {
        status: "success",
        note: note ?? {},
      };
    }

    const note: NoteDoc = await NoteModel.findById(id);

    if (!note) {
      const [note] = await this.returnNoteIfNotFound(userId);

      return {
        status: "success",
        note: note ?? {},
      };
    }

    if (note?.locked === true && !body.pin) {
      return {
        status: "error",
        pin_required: true,
        note: returnLockedNote(note),
      };
    }

    if (note?.locked && body.pin) {
      const user = await UserModel.findById(userId);
      const isCorrect = compareSync(body.pin, String(user?.pin_code));

      if (!isCorrect) {
        throw new BadRequestException("PIN was incorrect");
      }
    }

    if (!note.shared && note?.user_id?.toString() !== userId?.toString()) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("note"));
    }

    return {
      note,
      status: "success",
    };
  }

  @Put("/:id")
  @AuthGuard()
  async updateNoteById(
    @Param("id") id: string,
    @Body() body: IRequest["body"],
    @UserId() userId: ObjectId,
  ) {
    const { category_id, title, body: noteBody, locked, shared } = body;

    const [error] = await validateSchema(createOrUpdateNoteSchema, {
      category_id,
      title,
      body: noteBody,
      shareable: shared,
      locked,
    });
    if (error) {
      throw new BadRequestException(error.message, error.errors);
    }

    const note: NoteDoc = await NoteModel.findById(id);
    const markdown = useMarkdown(noteBody);

    if (!note) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("note"));
    }

    if (note.user_id.toString() !== userId.toString()) {
      throw new HttpException(403, ErrorMessages.PERMISSION_DENIED);
    }

    await NoteModel.findByIdAndUpdate(note._id, {
      title,
      category_id,
      body: noteBody,
      markdown,
      locked: isTrue(locked),
      shared: isTrue(shared),
    });

    const updated = await NoteModel.findById(id);
    const notes = await this._getUserNotes(userId);

    return {
      notes: parseLockedNotes(notes),
      note: updated,
      status: "success",
    };
  }

  @Delete("/:id")
  @AuthGuard()
  async deleteNoteById(@Param("id") id: string, @UserId() userId: ObjectId) {
    const note: NoteDoc = await NoteModel.findById(id);

    if (!note) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("note"));
    }

    if (note.user_id.toString() !== userId.toString()) {
      throw new HttpException(403, ErrorMessages.PERMISSION_DENIED);
    }

    await NoteModel.findByIdAndDelete(note._id);
    const notes = await this._getUserNotes(userId);

    return {
      notes: parseLockedNotes(notes),
      status: "success",
    };
  }

  @Get("/share/:id")
  async getShareById(@Param("id") id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("invalid objectId");
    }
    const note: NoteDoc = await NoteModel.findById(id);

    if (!note) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("note"));
    }

    if (note?.locked) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("note"));
    }

    if (note.shared === false) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("note"));
    }

    return {
      note,
      status: "success",
    };
  }
}

export default createHandler(NotesApiManager);
