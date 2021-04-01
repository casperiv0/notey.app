import * as React from "react";
import Modal from "@components/modal/Modal";
import { AlertDescription, AlertActions } from "@components/modal/styles";
import { Button } from "@styles/Global";
import { ModalIds } from "@lib/constants";

interface Props {
  id: ModalIds;
  title: string;
  description: string | React.ReactFragment;
  width?: string;
  actions: ModalAction[];
}

export interface ModalAction {
  name: string;
  danger?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AlertModal = (props: Props) => {
  return (
    <Modal width={props.width ?? "500px"} title={props.title} id={props.id}>
      <AlertDescription>{props.description}</AlertDescription>

      <AlertActions>
        {props.actions.map((action, idx) => (
          <Button danger={action.danger} onClick={action.onClick} key={idx}>
            {action.name}
          </Button>
        ))}
      </AlertActions>
    </Modal>
  );
};

export default AlertModal;
