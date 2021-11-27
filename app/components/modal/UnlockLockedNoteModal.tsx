import { Form, useTransition } from "remix";
import { useLocation } from "react-router";
import { Button } from "~/components/Button";
import { Modal } from "~/components/modal/Modal";
import { Modals } from "~/lib/constants";
import { useModal } from "~/lib/useModal";
import { FormField } from "../form/FormField";
import { Input } from "../form/Input";

export const UnlockLockedNoteModal = () => {
  const { closeModal, getPayload } = useModal();
  const noteId = getPayload(Modals.UnLock_LockedNote);
  const { state } = useTransition();

  const { pathname } = useLocation();
  const apiUrl = `/api/locked?next=${pathname}`;

  return (
    <Modal
      description="Please enter your PIN Code before continuing"
      id={Modals.UnLock_LockedNote}
      title="Locked!"
    >
      <Form action={apiUrl} className="mt-3" method="post">
        <input className="hidden" defaultValue={noteId} name="id" />

        <FormField label="PIN Code">
          <Input required name="pin_code" />
        </FormField>

        <div className="flex justify-between mt-5">
          <Button
            type="button"
            onClick={() => closeModal(Modals.UnLock_LockedNote)}
            variant="cancel"
          >
            Cancel
          </Button>
          <Button loading={state !== "idle"} type="submit">
            Continue
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
