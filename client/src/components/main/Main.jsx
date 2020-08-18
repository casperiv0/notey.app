import React from "react";
import Navbar from "../navbar/Navbar";
import { MainStyle } from "../../styles/Main";
import Note from "../note/Note";
import Loader from "../Loader";
import { GREEN } from "../../styles/colors";

const Main = ({
  notes,
  activeNote,
  loading,
  deleteNote,
  editNote,
  noteBody,
  noteTitle,
  setNoteBody,
  setNoteTitle,
  editing,
}) => {
  return (
    <MainStyle>
      <Navbar
        editing={editing}
        editNote={editNote}
        deleteNote={deleteNote}
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        note={activeNote ? activeNote : notes[0]}
      />
      {loading ? (
        <Loader color={GREEN}></Loader>
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
