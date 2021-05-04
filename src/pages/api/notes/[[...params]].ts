import {
  createHandler,
  Post,
  BadRequestException,
  NotFoundException,
  Body,
  Req,
  Delete,
  Get,
  Put,
  Param,
  HttpException,
  Query,
  UseMiddleware,
} from "@storyofams/next-api-decorators";
import "@lib/database";
import NoteModel, { NoteDoc } from "@models/Note.model";
import { IRequest } from "types/IRequest";
import { isTrue, parseLockedNotes } from "@lib/utils";
import { isValidObjectId, ObjectId } from "mongoose";
import useMarkdown from "@hooks/useMarkdown";
import { ErrorMessages } from "@lib/errors";
import { AuthGuard, CookieParser, Cors, RateLimit } from "@lib/middlewares";

@UseMiddleware(Cors, CookieParser, RateLimit)
class NotesApiManager {
  private async _getUserNotes(userId: ObjectId): Promise<NoteDoc[]> {
    return NoteModel.find({ user_id: userId });
  }

  @Get()
  @AuthGuard()
  async getUserNotes(@Req() req: IRequest, @Query("lastId") lastId: string) {
    let notes = await this._getUserNotes(req.userId);

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
  async createNote(@Body() body: IRequest["body"], @Req() req: IRequest) {
    const { categoryId, title, body: noteBody, shareable, locked } = body;

    if (!categoryId || !title || !noteBody) {
      throw new BadRequestException(ErrorMessages.ALL_FIELDS);
    }

    if (title.length > 40) {
      throw new BadRequestException(ErrorMessages.NOTE_TITLE_LIMIT_40);
    }

    const markdown = useMarkdown(noteBody);
    const newNote: NoteDoc = new NoteModel({
      user_id: req.userId,
      category_id: categoryId,
      title,
      body: noteBody,
      markdown: markdown,
      shared: isTrue(shareable),
      locked: isTrue(locked),
    });
    await newNote.save();
    const notes = await this._getUserNotes(req.userId);

    return {
      note: newNote,
      notes: parseLockedNotes(notes),
      status: "success",
    };
  }

  @Get("/:id")
  @AuthGuard()
  async getNoteById(@Param("id") id: string, @Req() req: IRequest) {
    if (!isValidObjectId(id)) {
      const note = await NoteModel.find({ user_id: req.userId }).limit(1);

      return {
        status: "success",
        note: note?.[0] ?? {},
      };
    }

    const note: NoteDoc = await NoteModel.findById(id);

    if (!note) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("note"));
    }

    if (note?.locked) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("note"));
    }

    if (!note.shared && note?.user_id?.toString() !== req.userId?.toString()) {
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
    @Req() req: IRequest,
  ) {
    const { category_id, title, body: noteBody, locked, shared } = body;

    if (!category_id || !title || !noteBody) {
      throw new BadRequestException(ErrorMessages.ALL_FIELDS);
    }

    if (title.length > 40) {
      throw new BadRequestException(ErrorMessages.NOTE_TITLE_LIMIT_40);
    }

    const note: NoteDoc = await NoteModel.findById(id);
    const markdown = useMarkdown(noteBody);

    if (!note) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("note"));
    }

    if (note.user_id.toString() !== req.userId.toString()) {
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
    const notes = await this._getUserNotes(req.userId);

    return {
      notes: parseLockedNotes(notes),
      note: updated,
      status: "success",
    };
  }

  @Delete("/:id")
  @AuthGuard()
  async deleteNoteById(@Param("id") id: string, @Req() req: IRequest) {
    const note: NoteDoc = await NoteModel.findById(id);

    if (!note) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND("note"));
    }

    if (note.user_id.toString() !== req.userId.toString()) {
      throw new HttpException(403, ErrorMessages.PERMISSION_DENIED);
    }

    await NoteModel.findByIdAndDelete(note._id);
    const notes = await this._getUserNotes(req.userId);

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
