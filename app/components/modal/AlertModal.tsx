import * as React from "react";
import { useLocation } from "react-router";
import { Form, FormMethod, useTransition } from "remix";
import { useModal } from "~/lib/useModal";
import { Button } from "../Button";
import { Input } from "../form/Input";
import { Modal } from "./Modal";

interface Props {
  id: string;
  title: string;
  description: string | React.ReactFragment;
  action: `${FormMethod}-${string}`;

  dataId: string;
}

export const AlertModal = (props: Props) => {
  const { closeModal } = useModal();
  const { state } = useTransition();
  const location = useLocation();

  const [method, action] = props.action.split("-") as [FormMethod, string];
  const next = location.pathname;
  const fullAction = `${action}?next=${next}`;

  React.useEffect(() => {
    if (state === "submitting") {
      closeModal(props.id);
    }
  }, [state, props.id]);

  return (
    <Modal {...props} extra={{ isAlert: true, width: 520 }}>
      <Form action={fullAction} method={method} className="mt-2">
        <Input className="hidden" defaultValue={props.dataId} id="id" name="id" />

        <div className="flex justify-between">
          <Button type="button" onClick={() => closeModal(props.id)} variant="cancel">
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Delete
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
