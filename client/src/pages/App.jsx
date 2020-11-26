import React, { useEffect, useState, lazy, Suspense } from "react";
import qs from "qs";
import Sidebar from "../components/sidebar";
import Main from "../components/main";
import { connect } from "react-redux";
import { AppLayout } from "../styles/Global";
import { checkAuth } from "../actions/auth";
import { closeSidebar } from "../utils/functions";
import { addMessage } from "../actions/message";
import { getCategories, deleteCategory } from "../actions/category";
import {
  getActiveNote,
  getNotes,
  deleteNoteById,
  updateNoteById,
} from "../actions/notes";
import EnterPinModal from "../components/modal/EnterPinModal";
import SetPinModal from "../components/modal/SetPinModal";

const AlertMessages = lazy(() => import("../components/AlertMessages/"));
const OptionsModal = lazy(() => import("../components/modal/OptionsModal"));
const CreateNote = lazy(() => import("../components/modal/CreateNote"));
const CreateCategory = lazy(() => import("../components/modal/CreateCategory"));
const ManageNoteModal = lazy(() =>
  import("../components/modal/ManageNoteModal")
);

const App = ({
  getNotes,
  getActiveNote,
  notes,
  note: activeNote,
  location,
  deleteNoteById,
  updateNoteById,
  getCategories,
  categories,
  deleteCategory,
  addMessage,
}) => {
  const noteId = qs.parse(location.search, { ignoreQueryPrefix: true }).noteId;
  const openSetModal = qs.parse(location.search, { ignoreQueryPrefix: true })
    .create;
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    getNotes();
    getCategories();
    getActiveNote(noteId);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [getNotes, getCategories, getActiveNote, noteId, setLoading]);

  const getActiveNoteFunc = (id) => {
    if (editing) {
      return addMessage(
        "Please save your current progress or reload to cancel changes"
      );
    }

    const search = qs.stringify({ noteId: id }, { addQueryPrefix: true });
    window.location = `#app${search}`;
    getActiveNote(id);
  };

  const editNote = (saving, id) => {
    if (editing && saving === "save") {
      if (noteTitle.length > 40) {
        return addMessage("Note title has a limit of 40 characters.");
      }
      if (noteTitle === "") {
        return addMessage("Note title can not be empty");
      }
      if (noteBody === "") {
        return addMessage("Note body can not be empty");
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

  function deleteNote(id) {
    // eslint-disable-next-line no-restricted-globals
    const conf = confirm(
      "Are you sure you want to deleted this note? This cannot be undone!"
    );

    if (conf === false) return;

    if (editing) {
      setEditing(false);
    }
    deleteNoteById(id);

    getActiveNote(notes.length < 0 ? notes[notes.length - 2]._id : notes[0]);
  }

  return (
    <Suspense fallback={<p></p>}>
      <SetPinModal />
      <EnterPinModal />
      <ManageNoteModal />
      <OptionsModal />
      <CreateCategory />
      <CreateNote openSetModal={openSetModal} />
      <AppLayout>
        <AlertMessages />
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
  getCategories,
  deleteCategory,
  addMessage,
})(App);
