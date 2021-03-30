import * as React from "react";
import { MainStyle } from "./styles";
import Navbar from "@components/navbar/Navbar";
import { connect } from "react-redux";
import State from "types/State";
import Note from "types/Note";
import { updateNoteById } from "@actions/note";
import { RequestData } from "@lib/fetch";
import { toast } from "react-toastify";
import { NO_ERROR } from "@lib/constants";

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

    updateNoteById(editingNote?._id, (editingNote as unknown) as RequestData);
  }, [editing, editingNote, updateNoteById]);

  return (
    <MainStyle>
      <Navbar />
    </MainStyle>
  );
};

const mapToProps = (state: State) => ({
  editing: state.notes.editing,
  editingNote: state.notes.editingNote,
  note: state.notes.note,
});

export default connect(mapToProps, { updateNoteById })(Main);
