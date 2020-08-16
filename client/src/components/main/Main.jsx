import React from "react";
import Navbar from "../navbar/Navbar";
import { MainStyle } from "../../styles/Main";
import Note from "../note/Note";
import Loader from "../Loader";

const Main = ({ notes, activeNote, loading, deleteNote }) => {
  return (
    <MainStyle>
      <Navbar deleteNote={deleteNote} note={activeNote ? activeNote : notes[0]} />
      {loading ? <Loader></Loader> : <Note note={activeNote ? activeNote : notes[0]} />}
    </MainStyle>
  );
};
export default Main;
