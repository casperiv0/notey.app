import React, { useState, useEffect } from "react";
import { FormGroup, FormLabel, FormInput, SubmitBtn } from "../../styles/Auth";
import { TextArea } from "../../styles/Global";
import ErrorMessage from "../ErrorMessage";
import Modal from "../modal/Modal";
import { connect } from "react-redux";
import { createNote } from "../../actions/notes";
import { Redirect } from "react-router-dom";
import Loader from "../Loader";

const CreateNote = ({ createNote, error, createdNote }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [canClose, setCanClose] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      body,
    };
    createNote(data);
    setHasSubmitted(true);
  };

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
      setTimeout(() => {
        setTitle("");
        setBody("");
        setHasSubmitted(false);
        setLoading(false);
      }, 200);
    }

    if (canClose) {
      document.getElementById("createNoteModal").classList.remove("active");
      document.getElementById("createNoteModalBg").classList.remove("active");
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
});

export default connect(mapStateToProps, { createNote })(CreateNote);
