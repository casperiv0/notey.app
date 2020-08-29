import React, { useEffect } from "react";
import { NoteStyle, NotePreview, NoteTextArea } from "./notes.style";

const Note = ({ note, editing, noteBody, setNoteBody }) => {
  useEffect(() => {
    setNoteBody(note && note.body);
  }, [note, setNoteBody]);

  useEffect(() => {
    document
      .querySelectorAll("#noteArea a")
      .forEach((link) => (link.target = "_blank"));
  });

  return (
    <NoteStyle editing={editing}>
      {note && note.body ? (
        editing ? (
          <EditingArea setNoteBody={setNoteBody} noteBody={noteBody} />
        ) : (
          <NotePreview
            id="noteArea"
            dangerouslySetInnerHTML={{ __html: note && note.markdown }}
          ></NotePreview>
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
