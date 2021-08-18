import * as React from "react";
import { observer } from "mobx-react-lite";
import Modal from "@components/modal/Modal";
import { FormGroup, FormLabel, FormInput, SubmitBtn } from "@styles/Auth";
import { closeModal, closeSidebar } from "lib/utils";
import Loader from "@components/loader/Loader";
import { createCategory } from "actions/categories";
import useModalEvent from "@hooks/useModalEvent";
import { ModalIds } from "lib/constants";
import { useStore } from "store/StoreProvider";

const CreateCategoryModal = () => {
  const store = useStore();

  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");

  const inputRef = useModalEvent<HTMLInputElement>(ModalIds.CreateCategoryModal);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const data = await createCategory({ name });

    if (data) {
      store.hydrate(data);
      setName("");
      closeModal(ModalIds.CreateCategoryModal);
      closeSidebar("sidebar");
    }

    setLoading(false);
  }

  return (
    <Modal id={ModalIds.CreateCategoryModal} title="Create new category">
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput
            ref={inputRef}
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

export default observer(CreateCategoryModal);
