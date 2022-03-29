import * as React from "react";
import { useLocation } from "react-router";
import { FormMethod, useFetcher } from "remix";
import { useModal } from "~/lib/useModal";
import { Button } from "../Button";
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
  const location = useLocation();
  const fetcher = useFetcher();

  const [method, action] = props.action.split("-") as [FormMethod, string];
  const next = location.pathname;
  const fullAction = `${action}?next=${next}`;

  React.useEffect(() => {
    if (fetcher.state === "loading") {
      closeModal(props.id);
    }
  }, [fetcher.state, props.id, closeModal]);

  async function handleDelete() {
    fetcher.submit(
      { id: props.dataId },
      {
        action: fullAction,
        method,
      },
    );
  }

  return (
    <Modal {...props} extra={{ isAlert: true, width: 520 }}>
      <div className="flex justify-between">
        <Button type="button" onClick={() => closeModal(props.id)} variant="cancel">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          loading={fetcher.state !== "idle"}
          variant="danger"
          type="button"
        >
          {fetcher.state !== "idle" ? "Deleting.." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};
