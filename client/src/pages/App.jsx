import React, { useEffect, useState } from "react";
import { AppLayout } from "../styles/Global";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";
import { connect } from "react-redux";
import {
  getActiveNote,
  getNotes,
  deleteNoteById,
  updateLastActiveNote,
} from "../actions/notes";
import { checkAuth } from "../actions/auth";
import qs from "qs";
import CreateNote from "../components/modal/CreateNote";

const App = ({
  checkAuth,
  getNotes,
  getActiveNote,
  notes,
  note,
  location,
  user,
  deleteNoteById,
  updateLastActiveNote,
}) => {
  const noteId = qs.parse(location.search, { ignoreQueryPrefix: true }).noteId;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    getNotes();
    getActiveNote(noteId);

    setTimeout(() => {
      setLoading(false)
    }, 300);

  }, []);

  const deleteNote = (id) => {
    deleteNoteById(id);
  };

  const updateLastActive = (id) => {
    updateLastActiveNote(id);
  };

  return (
    <>
      <CreateNote />
      <AppLayout>
        <Sidebar
          updateLastActive={updateLastActive}
          loading={loading}
          notes={notes}
          activeNote={note}
        />
        <Main
          notes={notes}
          deleteNote={deleteNote}
          loading={loading}
          activeNote={note}
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
  updateLastActiveNote,
})(App);
