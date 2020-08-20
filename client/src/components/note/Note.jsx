import React, { useEffect } from "react";
import { NoteStyle, NoteTextArea } from "../../styles/Notes";

const Note = ({ note, editing, noteBody, setNoteBody }) => {
  // TODO: change to markdown area

  useEffect(() => {
    setNoteBody(note && note.body);
  }, [note, setNoteBody]);

  return (
    <NoteStyle>
      {note && note.body ? (
        editing ? (
          <EditingArea setNoteBody={setNoteBody} noteBody={noteBody} />
        ) : (
          <NoteTextArea
            defaultValue={note && note.body ? noteBody : ""}
            readOnly
          />
        )
      ) : (
        ""
      )}
    </NoteStyle>
  );
};

const EditingArea = ({ setNoteBody, noteBody }) => {
  return (
    <NoteTextArea
      spellCheck={false}
      onChange={(e) => setNoteBody(e.target.value)}
      value={noteBody ? noteBody : ""}
      id="note-text-area"
    ></NoteTextArea>
  );
};

export default Note;
