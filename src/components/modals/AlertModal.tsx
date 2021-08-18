import * as React from "react";
import Modal from "@components/modal/Modal";
import { AlertDescription, AlertActions } from "@components/modal/styles";
import { Button } from "@styles/Global";
import { ModalIds } from "lib/constants";
import useModalEvent from "@hooks/useModalEvent";

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

export const AlertModal = (props: Props) => {
  const ref = useModalEvent<HTMLButtonElement>(props.id);

  return (
    <Modal width={props.width ?? "500px"} title={props.title} id={props.id}>
      <AlertDescription>{props.description}</AlertDescription>

      <AlertActions>
        {props.actions.map((action, idx) => {
          // a spacer if there's only 1 button
          if (!action.name) return <p key={idx} />;

          return (
            <Button
              ref={idx === 0 ? ref : null}
              danger={action.danger}
              onClick={action.onClick}
              key={idx}
            >
              {action.name}
            </Button>
          );
        })}
      </AlertActions>
    </Modal>
  );
};
