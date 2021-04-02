import { closeModal } from "@lib/utils";
import * as React from "react";
import { createPortal } from "react-dom";
import { usePortal } from "src/hooks/usePortal";
import { ModalStyle, ModalHeader, ModalBody, CloseModal, ModalContainer } from "./styles";
import useMounted from "@hooks/useMounted";
import { ModalIds } from "@lib/constants";

interface Props {
  id: ModalIds;
  title: string;
  width?: string;
  [key: string]: unknown;
}

const Modal: React.FC<Props> = ({ id, title, children, ...rest }) => {
  const portalRef = usePortal(id);
  const isMounted = useMounted();

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

  const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains("modal")) {
      closeModal(id);
    }
  };

  return isMounted
    ? createPortal(
        <ModalContainer onClick={handleOuterClick} {...rest} className="modal" id={id}>
          <ModalStyle width={rest.width} id={`style-${id}`} className={id}>
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
