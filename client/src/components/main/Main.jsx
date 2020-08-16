import React from "react";
import Navbar from "../navbar/Navbar";
import { MainStyle } from "../../styles/Main";
import Note from "../note/Note";
import Loader from "../Loader";

const Main = ({
  notes,
  activeNote,
  loading,
  deleteNote,
  editNote,
  noteBody,
  setNoteBody,
  editing,
}) => {
  return (
    <MainStyle>
      <Navbar
        editing={editing}
        editNote={editNote}
        deleteNote={deleteNote}
        note={activeNote ? activeNote : notes[0]}
      />
      {loading ? (
        <Loader></Loader>
      ) : (
        <Note
          noteBody={noteBody}
          setNoteBody={setNoteBody}
          editing={editing}
          note={activeNote ? activeNote : notes[0]}
        />
      )}
    </MainStyle>
  );
};
export default Main;
