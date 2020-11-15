import React from "react";
import Navbar from "../navbar/Navbar";
import Loader from "../Loader";
import Note from "../note/Note";
import { MainStyle } from "./main.style";

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
  categoryId,
  setCategoryId,
  categories,
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
        loading={loading}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
      />
      {loading ? (
        <Loader fullSize={true} color="#f2f2f2"></Loader>
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
