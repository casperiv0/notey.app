import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Modal from "../modal/Modal";
import SelectCategory from "../SelectCategory";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { closeSidebar, closeModal, openModal, closeAllModals } from "../../utils/functions";
import { createNote } from "../../actions/notes";
import { getCategories } from "../../actions/category";
import { TextArea } from "../../styles/Global";
import { FormGroup, FormLabel, FormInput, SubmitBtn, FormSmall } from "../../styles/Auth";
import { Select } from "../../styles/Global";

const CreateNote = ({
  createNote,
  createdNote,
  categories,
  getCategories,
  loading,
  openSetModal,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("no_category");
  const [canClose, setCanClose] = useState(false);
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

  async function onSubmit(e) {
    e.preventDefault();

    const data = {
      title,
      body,
      categoryId,
      shareable,
      locked,
    };
    const created = await createNote(data);

    setCanClose(created);
  }

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (canClose) {
      closeSidebar("sidebar");
      setTitle("");
      setBody("");
      setCategoryId("no_category");
      setShareable(false);
      setLocked(false);
      closeModal("createNoteModal");
      setCanClose(false);
    }
  }, [canClose]);

  return (
    <Modal style={{ zIndex: "29" }} title="Create new note" id="createNoteModal">
      <form onSubmit={onSubmit}>
        <FormGroup></FormGroup>
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
          <FormLabel>Shareable (People are able to view this with a link)</FormLabel>
          <Select value={shareable} onChange={(e) => setShareable(e.target.value)}>
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
          <FormSmall>
            You can set a PIN code by clicking "options" in the sidebar then pressing "change/set
            PIN Code"
          </FormSmall>
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
  createdNote: state.note.createdNote,
  categories: state.categories.categories,
  loading: state.note.loading,
});

export default connect(mapStateToProps, { createNote, getCategories })(CreateNote);
