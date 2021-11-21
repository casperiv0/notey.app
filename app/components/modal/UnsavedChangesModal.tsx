import { useNavigate } from "react-router";
import { Button } from "~/components/Button";
import { Modal } from "~/components/modal/Modal";
import { Modals } from "~/lib/constants";
import { useActiveNote } from "~/lib/note";
import { useModal } from "~/lib/useModal";

export const UnsavedChangesModal = () => {
  const { setEditMode } = useActiveNote();
  const { closeModal, getPayload } = useModal();
  const href = getPayload(Modals.AlertUnsavedChanges);
  const navigate = useNavigate();

  function handleClick() {
    setEditMode(false);
    closeModal(Modals.AlertUnsavedChanges);

    navigate(href);
  }

  return (
    <Modal
      description="You have unsaved changes, please save them before continuing!"
      id={Modals.AlertUnsavedChanges}
      title="Unsaved Changes"
      extra={{ isAlert: true }}
    >
      <div className="flex justify-between mt-5">
        <Button
          type="button"
          onClick={() => closeModal(Modals.AlertUnsavedChanges)}
          variant="cancel"
        >
          Cancel
        </Button>
        <Button onClick={handleClick} variant="danger" type="submit">
          Continue without saving
        </Button>
      </div>
    </Modal>
  );
};
