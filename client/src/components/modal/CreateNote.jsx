import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Modal from "../modal/Modal";
import ErrorMessage from "../ErrorMessage";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { closeSidebar, closeModal } from "../../utils/functions";
import { createNote } from "../../actions/notes";
import { getCategories } from "../../actions/category";
import { SelectCategory } from "../../styles/Category";
import { TextArea } from "../../styles/Global";
import { FormGroup, FormLabel, FormInput, SubmitBtn } from "../../styles/Auth";

const CreateNote = ({
  createNote,
  error,
  createdNote,
  categories,
  getCategories,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("no_category");
  const [canClose, setCanClose] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      body,
      categoryId,
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
      setLoading(false);
    }

    if (
      (error === null || error === "") &&
      hasSubmitted &&
      title !== "" &&
      body !== ""
    ) {
      setCanClose(true);
      closeSidebar("sidebar");
      setTimeout(() => {
        setTitle("");
        setBody("");
        setHasSubmitted(false);
        setLoading(false);
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
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="body">Body</FormLabel>
          <TextArea
            maxHeight="70vh"
            minHeight="200px"
            rows="10"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            id="body"
          ></TextArea>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="category">Category</FormLabel>
          <SelectCategory
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="no_category">No category</option>
            {categories &&
              categories.map((cat, i) => {
                return (
                  <option key={i} value={cat._id}>
                    {cat.name}
                  </option>
                );
              })}
          </SelectCategory>
        </FormGroup>
        <FormGroup>
          <SubmitBtn type="submit" disabled={loading}>
            {loading ? <Loader /> : "Create"}
          </SubmitBtn>
        </FormGroup>
      </form>

      {canClose ? <Redirect to={`/?noteId=${createdNote._id}`} /> : null}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  error: state.note.error,
  createdNote: state.note.createdNote,
  categories: state.categories.categories,
});

export default connect(mapStateToProps, { createNote, getCategories })(
  CreateNote
);
