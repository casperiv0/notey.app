import * as React from "react";
import { connect } from "react-redux";
import Note from "types/Note";
import State from "types/State";
import { NoteTextArea } from "./styles";
import { updateEditingNote } from "@actions/note";

interface Props {
  editingNote: Note | null;
  updateEditingNote: (data: Partial<Note>) => void;
}

const NoteEditingArea: React.FC<Props> = ({ editingNote, updateEditingNote }) => {
  return (
    <NoteTextArea
      onChange={(e) =>
        updateEditingNote({
          ...editingNote,
          body: e.target.value,
        })
      }
      value={editingNote?.body}
    ></NoteTextArea>
  );
};

const mapToProps = (state: State) => ({
  editingNote: state.notes.editingNote,
});

export default connect(mapToProps, { updateEditingNote })(NoteEditingArea);
