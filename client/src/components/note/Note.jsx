import React, { useEffect } from "react";
import { NoteStyle, NoteTextArea, NoteTextAreaBg } from "../../styles/Notes";

const Note = ({ note, editing, noteBody, setNoteBody }) => {
  // TODO: change to markdown area

  useEffect(() => {
    setNoteBody(note && note.body);
  }, [note, setNoteBody]);

  return (
    <NoteStyle>
      <NoteTextAreaBg className={editing ? "active" : ""}></NoteTextAreaBg>
      <NoteTextArea
        spellCheck={false}
        onChange={(e) => setNoteBody(e.target.value)}
        value={noteBody ? noteBody : ""}
        id="note-text-area"
      ></NoteTextArea>
    </NoteStyle>
  );
};

export default Note;
