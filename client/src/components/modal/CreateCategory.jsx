import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Modal from "../modal/Modal";
import ErrorMessage from "../ErrorMessage";
import { FormGroup, FormLabel, FormInput, SubmitBtn } from "../../styles/Auth";
import { connect } from "react-redux";
import { createCategory } from "../../actions/category";
import { closeSidebar, closeModal } from "../../utils/functions";

const CreateCategory = ({ createCategory, error, loading }) => {
  const [name, setName] = useState("");
  const [canClose, setCanClose] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
    };
    createCategory(data);
    setHasSubmitted(true);
  };

  useEffect(() => {
    if (error !== null) {
      setCanClose(false);
    }

    if ((error === null || error === "") && hasSubmitted && name !== "") {
      setCanClose(true);
      closeSidebar("sidebar");
      setTimeout(() => {
        setName("");
        setHasSubmitted(false);
      }, 200);
    }

    if (canClose) {
      closeModal("createCategoryModal");
    }
  }, [setName, setCanClose, canClose, hasSubmitted, error, name]);

  return (
    <Modal title="Create new category" id="createCategoryModal">
      <form onSubmit={onSubmit}>
        <FormGroup>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            maxLength="20"
            max="20"
          />
        </FormGroup>
        <FormGroup>
          <SubmitBtn type="submit" disabled={loading}>
            {loading ? <Loader /> : "Create"}
          </SubmitBtn>
        </FormGroup>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  error: state.categories.error,
  loading: state.categories.loading,
});

export default connect(mapStateToProps, { createCategory })(CreateCategory);
