import { closeModal } from "@lib/utils";
import * as React from "react";
import { createPortal } from "react-dom";
import { usePortal } from "src/hooks/usePortal";
import { ModalStyle, ModalHeader, ModalBody, CloseModal, ModalContainer } from "./styles";

interface Props {
  id: string;
  title: string;
  [key: string]: unknown;
}

const Modal: React.FC<Props> = ({ id, title, children, ...rest }) => {
  const portalRef = usePortal(id);
  const [rendered, setRendered] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal(id);
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [id]);

  React.useEffect(() => setRendered(true), [portalRef]);

  return rendered
    ? createPortal(
        <ModalContainer {...rest} className="modal" id={id}>
          <ModalStyle id={`style-${id}`} className={id}>
            <ModalHeader>
              {title}
              <CloseModal onClick={() => closeModal(id)}>&times;</CloseModal>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </ModalStyle>
        </ModalContainer>,
        portalRef!,
      )
    : null;
};

export default Modal;