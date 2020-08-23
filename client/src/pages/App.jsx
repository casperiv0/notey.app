import React, { useEffect, useState } from "react";
import qs from "qs";
import CreateNote from "../components/modal/CreateNote";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";
import AlertMessage from "../components/AlertMessage";
import OptionsModal from "../components/modal/OptionsModal";
import { AppLayout } from "../styles/Global";
import { connect } from "react-redux";
import { checkAuth } from "../actions/auth";
import { clearMessage } from "../actions/message";
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
  note: activeNote,
  location,
  deleteNoteById,
  updateNoteById,
  message,
  clearMessage,
}) => {
  const noteId = qs.parse(location.search, { ignoreQueryPrefix: true }).noteId;
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    getNotes();
    getActiveNote(noteId);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [getNotes, getActiveNote, noteId, setLoading]);

  // Clear alert message
  useEffect(() => {
    if (message !== "") {
      setAlertMsg(message);

      setTimeout(() => {
        clearMessage();
        setAlertMsg("");
      }, 4000);
    }
  }, [message, clearMessage, alertMsg]);

  const getActiveNoteFunc = (id) => {
    if (editing) {
      setAlertMsg(
        "Please save your current progress or reload to cancel changes"
      );

      return setTimeout(() => {
        setAlertMsg("");
      }, 4000);
    }

    getActiveNote(id);
  };

  const editNote = (saving, id) => {
    if (editing && saving === "save") {
      if (noteTitle.length > 40) {
        return setAlertMsg("Note title has a limit of 40 characters.");
      }
      if (noteTitle === "") {
        return setAlertMsg("Note title can not be empty");
      }
      if (noteBody === "") {
        return setAlertMsg("Note body can not be empty");
      }

      updateNoteById(id, { title: noteTitle, body: noteBody });
      setNoteTitle("");
      setNoteBody("");
    }

    setEditing(!editing);
  };

  const deleteNote = (id) => {
    if (editing) {
      setEditing(false);
    }
    deleteNoteById(id);
    getActiveNote(notes[0]);
  };

  return (
    <>
      <CreateNote />
      <OptionsModal />
      <AppLayout>
        <AlertMessage active={alertMsg !== ""} message={alertMsg} />
        <Sidebar
          loading={loading}
          notes={notes}
          activeNote={activeNote}
          getActiveNote={getActiveNoteFunc}
        />
        <Main
          editNote={editNote}
          editing={editing}
          notes={notes}
          deleteNote={deleteNote}
          loading={loading}
          activeNote={activeNote}
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
  message: state.message.content,
});

export default connect(mapStateToProps, {
  checkAuth,
  getNotes,
  getActiveNote,
  deleteNoteById,
  updateNoteById,
  clearMessage,
})(App);
