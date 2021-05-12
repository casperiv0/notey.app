import * as React from "react";
import { MainStyle } from "./styles";
import Navbar from "@components/navbar/Navbar";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import State from "types/State";
import Note from "types/Note";
import { updateNoteById } from "@actions/note";
import { RequestData } from "@lib/fetch";
import { NO_ERROR } from "@lib/constants";
import EditingArea from "@components/note/EditingArea";
import NotePreview from "@components/note/NotePreview";
import { NoteStyle } from "@components/note/styles";

interface Props {
  editingNote: Note | null;
  note: Note | null;
  editing: boolean | null;
  updateNoteById: (noteId: string, data: RequestData) => void;
}

const Main: React.FC<Props> = ({ editing, note, editingNote, updateNoteById }) => {
  React.useEffect(() => {
    if (editing === null) return;
    if (editing === true) return;
    if (!editingNote) {
      toast.error(NO_ERROR);
      return;
    }

    if (editingNote.title.length > 40) {
      toast.error("Note title has a limit of 40 characters");
      return;
    }
    if (editingNote.title === "") {
      toast.error("Note title cannot be empty");
      return;
    }
    if (editingNote.body === "") {
      toast.error("Note body cannot be empty");
      return;
    }

    if (editingNote.body.toLowerCase() !== note?.body.toLowerCase()) {
      updateNoteById(editingNote?._id, editingNote as unknown as RequestData);
    }

    if (editingNote.title.toLowerCase() !== note?.title.toLowerCase()) {
      updateNoteById(editingNote?._id, editingNote as unknown as RequestData);
    }

    if (editingNote.category_id !== note?.category_id) {
      updateNoteById(editingNote?._id, editingNote as unknown as RequestData);
    }
  }, [editing, editingNote, note, updateNoteById]);

  return (
    <MainStyle>
      <Navbar />

      {editing ? (
        <NoteStyle editing={true}>
          <EditingArea />
        </NoteStyle>
      ) : (
        <NotePreview note={note} />
      )}
    </MainStyle>
  );
};

const mapToProps = (state: State) => ({
  editing: state.notes.editing,
  editingNote: state.notes.editingNote,
  note: state.notes.note,
});

export default connect(mapToProps, { updateNoteById })(Main);
