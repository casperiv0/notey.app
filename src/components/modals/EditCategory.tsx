import Modal from "@components/modal/Modal";
import { ModalIds } from "@lib/constants";
import { closeModal, openModal } from "@lib/utils";
import { FormGroup, FormInput, FormLabel } from "@styles/Auth";
import { Button, Row } from "@styles/Global";
import * as React from "react";
import { connect } from "react-redux";
import Category from "types/Category";
import AlertModal from "./AlertModal";
import { deleteCategory, updateCategoryById } from "@actions/categories";
import useModalEvent from "@hooks/useModalEvent";
import { RequestData } from "@lib/fetch";

interface Props {
  category: Category | null;
  deleteCategory: (id: string) => void;
  updateCategoryById: (id: string, data: RequestData) => void;
}

const EditCategoryModal = ({ category, deleteCategory, updateCategoryById }: Props) => {
  const [name, setName] = React.useState(category?.name ?? "");
  const ref = useModalEvent<HTMLInputElement>(ModalIds.EditCategory);
  const isDisabled = React.useMemo(() => name.toLowerCase() === category?.name.toLowerCase(), [
    name,
    category?.name,
  ]);

  React.useEffect(() => {
    setName(category?.name ?? "");
  }, [category?.name]);

  const handleDeleteCategory = () => {
    category?._id && deleteCategory(category._id);

    closeModal(ModalIds.AlertDeleteCategory);
    closeModal(ModalIds.EditCategory);
  };

  const handleDelete = () => {
    openModal(ModalIds.AlertDeleteCategory);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;

    category?._id &&
      updateCategoryById(category._id, {
        name,
      });
  };

  return (
    <>
      <Modal title="Edit category" id={ModalIds.EditCategory}>
        {!category?._id ? (
          <p>A category must be provided as props.</p>
        ) : (
          <form onSubmit={onSubmit}>
            <FormGroup>
              <FormLabel htmlFor="edit_category_name">Category name</FormLabel>

              <FormInput
                ref={ref}
                id="edit_category_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <Row style={{ justifyContent: "space-between" }}>
              <Button type="button" onClick={handleDelete} danger>
                Delete
              </Button>
              <Button disabled={isDisabled} type="submit">
                Save Changes
              </Button>
            </Row>
          </form>
        )}
      </Modal>

      <AlertModal
        id={ModalIds.AlertDeleteCategory}
        title="Are you sure?"
        description={
          <>
            Are you sure you want to deleted this <strong>category</strong>? This cannot be undone!
          </>
        }
        actions={[
          {
            name: "Cancel",
            onClick: () => closeModal(ModalIds.AlertDeleteCategory),
          },
          {
            danger: true,
            name: "Delete",
            onClick: handleDeleteCategory,
          },
        ]}
      />
    </>
  );
};

export default connect(null, { deleteCategory, updateCategoryById })(EditCategoryModal);
