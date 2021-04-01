import { RequestData } from "@lib/fetch";
import * as React from "react";
import { connect } from "react-redux";
import Modal from "@components/modal/Modal";
import { FormGroup, FormLabel, FormInput, SubmitBtn } from "@styles/Auth";
import { closeModal, closeSidebar } from "@lib/utils";
import State from "types/State";
import Loader from "@components/loader/Loader";
import { createCategory } from "@actions/categories";
import useModalEvent from "@hooks/useModalEvent";
import { ModalIds } from "@lib/constants";

interface Props {
  createCategory: (data: RequestData) => Promise<boolean>;
  loading: boolean;
}

const CreateCategoryModal: React.FC<Props> = ({ loading, createCategory }) => {
  const [name, setName] = React.useState("");
  const [canClose, setCanClose] = React.useState(false);
  const inputRef = useModalEvent<HTMLInputElement>(ModalIds.CreateCategoryModal);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const created = await createCategory({ name });

    setCanClose(created);
  }

  React.useEffect(() => {
    if (canClose) {
      setName("");
      closeModal(ModalIds.CreateCategoryModal);
      closeSidebar("sidebar");
      setCanClose(false);
    }
  }, [canClose]);

  return (
    <Modal id={ModalIds.CreateCategoryModal} title="Create new category">
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput
            ref={inputRef}
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            maxLength={20}
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

const mapToProps = (state: State) => ({
  loading: state.categories.loading,
});

export default connect(mapToProps, { createCategory })(CreateCategoryModal);
