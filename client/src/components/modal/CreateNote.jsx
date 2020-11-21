import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Modal from "../modal/Modal";
import ErrorMessage from "../ErrorMessage";
import SelectCategory from "../SelectCategory";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  closeSidebar,
  closeModal,
  openModal,
  closeAllModals,
} from "../../utils/functions";
import { createNote } from "../../actions/notes";
import { getCategories } from "../../actions/category";
import { TextArea } from "../../styles/Global";
import { FormGroup, FormLabel, FormInput, SubmitBtn } from "../../styles/Auth";
import { Select } from "../../styles/Global";

const CreateNote = ({
  createNote,
  error,
  createdNote,
  categories,
  getCategories,
  loading,
  openSetModal,
  pinCode,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("no_category");
  const [canClose, setCanClose] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [shareable, setShareable] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (openSetModal === "note") {
      closeAllModals();
      return openModal("createNoteModal");
    }

    if (openSetModal === "category") {
      closeAllModals();
      return openModal("createCategoryModal");
    }
  }, [openSetModal]);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      body,
      categoryId,
      shareable,
      locked,
    };
    createNote(data);
    setHasSubmitted(true);
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (error !== "" || error !== null) {
      setCanClose(false);
    }

    if (
      (error === "" || error === null) &&
      hasSubmitted &&
      title !== "" &&
      body !== ""
    ) {
      if (locked && !pinCode) {
        return openModal("setPinModal");
      }

      setCanClose(true);
      closeSidebar("sidebar");
      setTimeout(() => {
        setTitle("");
        setBody("");
        setCategoryId("no_category");
        setHasSubmitted(false);
        setShareable(false);
        setLocked(false);
      }, 200);
    }

    if (canClose) {
      closeModal("createNoteModal");
    }
  }, [
    setTitle,
    setBody,
    setCanClose,
    canClose,
    body,
    title,
    hasSubmitted,
    error,
    locked,
    pinCode,
  ]);

  return (
    <Modal title="Create new note" id="createNoteModal">
      <form onSubmit={onSubmit}>
        <FormGroup>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="title">Title</FormLabel>
          <FormInput
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            maxLength="40"
            max="40"
            autoCorrect="false"
            autoComplete="false"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="body">Body</FormLabel>
          <TextArea
            maxHeight="70vh"
            minHeight="45px"
            rows="10"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            autoCorrect="false"
            autoComplete="false"
            id="body"
          ></TextArea>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="category">Category</FormLabel>
          <SelectCategory
            id="category"
            setCategoryId={setCategoryId}
            categoryId={categoryId}
            categories={categories}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>
            Shareable (People are able to view this with a link)
          </FormLabel>
          <Select
            value={shareable}
            onChange={(e) => setShareable(e.target.value)}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <FormLabel>Locked</FormLabel>
          <Select value={locked} onChange={(e) => setLocked(e.target.value)}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <SubmitBtn type="submit" disabled={loading}>
            {loading ? <Loader /> : "Create"}
          </SubmitBtn>
        </FormGroup>
      </form>

      {canClose ? <Redirect to={`/app?noteId=${createdNote._id}`} /> : null}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  error: state.note.error,
  createdNote: state.note.createdNote,
  categories: state.categories.categories,
  loading: state.note.loading,
  pinCode: state.auth.user.pin_code,
});

export default connect(mapStateToProps, { createNote, getCategories })(
  CreateNote
);
