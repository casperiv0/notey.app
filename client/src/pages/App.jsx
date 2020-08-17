import React, { useEffect, useState } from "react";
import { AppLayout } from "../styles/Global";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";
import { connect } from "react-redux";
import {
  getActiveNote,
  getNotes,
  deleteNoteById,
  updateNoteById,
} from "../actions/notes";
import { checkAuth } from "../actions/auth";
import qs from "qs";
import CreateNote from "../components/modal/CreateNote";

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

  useEffect(() => {
    getNotes();
    getActiveNote(noteId);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [getNotes, getActiveNote, noteId, setLoading]);

  useEffect(() => {
    if (!loading) {
      setNoteBody(note && note.body);
    }
  }, [loading, note]);

  const deleteNote = (id) => {
    deleteNoteById(id);
    getActiveNote(notes[0]._id);
  };

  const editNote = (saving, id) => {
    setEditing(!editing);

    if (saving === "save") {
      if (note && note.body === noteBody) return;
      updateNoteById(id, { body: noteBody });
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
          setNoteBody={setNoteBody}
        />
      </AppLayout>
    </>
  );
};

const mapStateToProps = (state) => ({
  notes: state.note.notes,
  note: state.note.note,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  checkAuth,
  getNotes,
  getActiveNote,
  deleteNoteById,
  updateNoteById,
})(App);
