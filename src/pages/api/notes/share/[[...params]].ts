import NoteModel, { NoteDoc } from "@models/Note.model";
import "@lib/database";

import {
  createHandler,
  BadRequestException,
  NotFoundException,
  Get,
  Param,
} from "@storyofams/next-api-decorators";
import "@lib/database";
import { isValidObjectId } from "mongoose";
import { ErrorMessages } from "@lib/errors";
// import { AuthGuard } from "@lib/middlewares";

class NotesShareApiManager {
  @Get("/:id")
  // @AuthGuard()
  async getNoteById(@Param("id") id: string) {
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

export default createHandler(NotesShareApiManager);
