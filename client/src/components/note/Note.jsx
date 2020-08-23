import React, { useEffect } from "react";
import { NoteStyle, NoteTextArea } from "../../styles/Notes";
import { GREEN } from "../../styles/colors";

const Note = ({ note, editing, noteBody, setNoteBody }) => {
  useEffect(() => {
    setNoteBody(note && note.body);
  }, [note, setNoteBody]);

  return (
    <NoteStyle>
      {note && note.body ? (
        editing ? (
          <EditingArea setNoteBody={setNoteBody} noteBody={noteBody} />
        ) : (
          <div
            style={{ padding: "10px", color: GREEN, fontSize: "1.2rem" }}
            dangerouslySetInnerHTML={{ __html: note && note.markdown }}
          ></div>
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
