import React, { useEffect, useState, lazy, Suspense } from "react";
import qs from "qs";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../components/sidebar";
import Main from "../components/main";
import { AppLayout } from "../styles/Global";
import { checkAuth } from "../actions/auth";
import { closeSidebar } from "../utils/functions";
import { getCategories } from "../actions/category";
import { getActiveNote, getNotes, deleteNoteById, updateNoteById } from "../actions/notes";

const OptionsModal = lazy(() => import("../components/modal/OptionsModal"));
const CreateNote = lazy(() => import("../components/modal/CreateNote"));
const CreateCategory = lazy(() => import("../components/modal/CreateCategory"));
const ManageNoteModal = lazy(() => import("../components/modal/ManageNoteModal"));
const EnterPinModal = lazy(() => import("../components/modal/EnterPinModal"));
const SetPinModal = lazy(() => import("../components/modal/SetPinModal"));

const App = ({
  getNotes,
  getActiveNote,
  notes,
  note: activeNote,
  deleteNoteById,
  updateNoteById,
  getCategories,
  categories,
}) => {
  const history = useHistory();
  const location = useLocation();
  const noteId = qs.parse(location.search, { ignoreQueryPrefix: true })?.noteId;
  const openSetModal = qs.parse(location.search, { ignoreQueryPrefix: true })?.create;
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
      return toast.info("Please save your current progress or reload the page to cancel changes");
    }

    history.push(`app?noteId=${id}`);
    getActiveNote(id);
  };

  const editNote = (saving, id) => {
    if (editing && saving === "save") {
      if (noteTitle.length > 40) {
        return toast.error("Note title has a limit of 40 characters");
      }
      if (noteTitle === "") {
        return toast.error("Note title cannot be empty");
      }
      if (noteBody === "") {
        return toast.error("Note body cannot be empty");
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

  async function deleteNote(id) {
    // eslint-disable-next-line no-restricted-globals
    const conf = confirm("Are you sure you want to deleted this note? This cannot be undone!");

    if (conf === false) return;

    if (editing) {
      setEditing(false);
    }
    const deleted = await deleteNoteById(id);

    deleted && getActiveNote(notes.length < 0 ? notes[notes.length - 2]._id : notes[0]);
  }

  return (
    <Suspense fallback={<p></p>}>
      <ToastContainer position="bottom-right" />
      <SetPinModal />
      <EnterPinModal />
      <ManageNoteModal />
      <OptionsModal />
      <CreateCategory />
      <CreateNote openSetModal={openSetModal} />
      <AppLayout>
        <Sidebar
          categories={categories}
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
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
        />
      </AppLayout>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  notes: state.note.notes,
  categories: state.categories.categories,
  note: state.note.note,
});

export default connect(mapStateToProps, {
  checkAuth,
  getNotes,
  getActiveNote,
  deleteNoteById,
  updateNoteById,
  getCategories,
})(App);
