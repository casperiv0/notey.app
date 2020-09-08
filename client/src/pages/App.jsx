import React, { useEffect, useState, lazy, Suspense } from "react";
import qs from "qs";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";
import { connect } from "react-redux";
import { AppLayout } from "../styles/Global";
import { checkAuth } from "../actions/auth";
import { closeSidebar } from "../utils/functions";
import { clearMessage } from "../actions/message";
import { getCategories, deleteCategory } from "../actions/category";
import {
  getActiveNote,
  getNotes,
  deleteNoteById,
  updateNoteById,
} from "../actions/notes";

const AlertMessage = lazy(() => import("../components/AlertMessage/"));
const OptionsModal = lazy(() => import("../components/modal/OptionsModal"));
const CreateNote = lazy(() => import("../components/modal/CreateNote"));
const CreateCategory = lazy(() => import("../components/modal/CreateCategory"));

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
  getCategories,
  categories,
  deleteCategory,
}) => {
  const noteId = qs.parse(location.search, { ignoreQueryPrefix: true }).noteId;
  const openSetModal = qs.parse(location.search, { ignoreQueryPrefix: true }).create;
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    getNotes();
    getCategories();
    getActiveNote(noteId);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [getNotes, getCategories, getActiveNote, noteId, setLoading]);

  // Clear alert message
  useEffect(() => {
    if (message !== null) {
      setAlertMsg(message);

      setTimeout(() => {
        clearMessage();
        setAlertMsg("");
      }, 4000);
    }
  }, [message, clearMessage]);

  const getActiveNoteFunc = (id) => {
    if (editing) {
      setAlertMsg(
        "Please save your current progress or reload to cancel changes"
      );

      return setTimeout(() => {
        clearMessage();
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

      updateNoteById(id, {
        title: noteTitle,
        body: noteBody,
        categoryId: categoryId,
      });
      closeSidebar("right-sidebar");
    }

    setEditing(!editing);
  };

  const deleteNote = (id) => {
    if (editing) {
      setEditing(false);
    }
    deleteNoteById(id);

    getActiveNote(notes.length < 0 ? notes[notes.length - 2]._id : notes[0]);
  };

  return (
    <Suspense fallback={<p></p>}>
      <CreateNote openSetModal={openSetModal} />
      <OptionsModal />
      <CreateCategory />
      <AppLayout>
        <AlertMessage active={alertMsg !== ""} message={alertMsg} />
        <Sidebar
          categories={categories}
          loading={loading}
          notes={notes}
          activeNote={activeNote}
          getActiveNote={getActiveNoteFunc}
          deleteCategory={deleteCategory}
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
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
        />
      </AppLayout>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  notes: state.note.notes,
  categories: state.categories.categories,
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
  getCategories,
  deleteCategory,
})(App);
