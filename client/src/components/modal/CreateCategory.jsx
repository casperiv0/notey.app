import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Modal from "../modal/Modal";
import { FormGroup, FormLabel, FormInput, SubmitBtn } from "../../styles/Auth";
import { connect } from "react-redux";
import { createCategory } from "../../actions/category";
import { closeSidebar, closeModal } from "../../utils/functions";

const CreateCategory = ({ createCategory, loading }) => {
  const [name, setName] = useState("");
  const [canClose, setCanClose] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    const created = await createCategory({ name });

    console.log(created);

    setCanClose(created);
  }

  useEffect(() => {
    if (canClose) {
      closeModal("createCategoryModal");
      setName("");
      closeSidebar("sidebar");
      setCanClose(false);
    }
  }, [canClose]);

  return (
    <Modal title="Create new category" id="createCategoryModal">
      <form onSubmit={onSubmit}>
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
  loading: state.categories.loading,
});

export default connect(mapStateToProps, { createCategory })(CreateCategory);
