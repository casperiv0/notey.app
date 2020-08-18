import React, { useEffect, useState } from "react";
import CreateNote from "../components/modal/CreateNote";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";
import qs from "qs";
import { AppLayout } from "../styles/Global";
import { connect } from "react-redux";
import { checkAuth } from "../actions/auth";
import {
  getActiveNote,
  getNotes,
  deleteNoteById,
  updateNoteById,
} from "../actions/notes";

const App = ({
  getNotes,
  getActiveNote,
  notes,
  note,
  location,
  deleteNoteById,
  updateNoteById,
}) => {
  const noteId = qs.parse(location.search, { ignoreQueryPrefix: true }).noteId;
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [noteBody, setNoteBody] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  useEffect(() => {
    getNotes();
    getActiveNote(noteId);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [getNotes, getActiveNote, noteId, setLoading]);

  useEffect(() => {
    if (editing) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setEditing(!editing);
          setNoteBody(note && note.body);
          setNoteTitle(note && note.title);
        }
      });
    }
  }, [editing, setEditing, note]);

  const deleteNote = (id) => {
    deleteNoteById(id);
    getActiveNote(notes[0]);
  };

  const editNote = (saving, id) => {
    setEditing(!editing);

    if (saving === "save") {
      updateNoteById(id, { title: noteTitle, body: noteBody });
    }
  };

  return (
    <>
      <CreateNote />
      <AppLayout>
        <Sidebar loading={loading} notes={notes} activeNote={note} />
        <Main
          editNote={editNote}
          editing={editing}
          notes={notes}
          deleteNote={deleteNote}
          loading={loading}
          activeNote={note}
          noteBody={noteBody}
          noteTitle={noteTitle}
          setNoteBody={setNoteBody}
          setNoteTitle={setNoteTitle}
        />
      </AppLayout>
    </>
  );
};

const mapStateToProps = (state) => ({
  notes: state.note.notes,
  note: state.note.note,
});

export default connect(mapStateToProps, {
  checkAuth,
  getNotes,
  getActiveNote,
  deleteNoteById,
  updateNoteById,
})(App);
