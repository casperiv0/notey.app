import { closeModal } from "lib/utils";
import * as React from "react";
import { createPortal } from "react-dom";
import { usePortal } from "@casper124578/useful/hooks/usePortal";
import { useMounted } from "@casper124578/useful/hooks/useMounted";
import { ModalStyle, ModalHeader, ModalBody, CloseModal, ModalContainer } from "./styles";
import { ModalIds } from "lib/constants";

interface Props {
  id: ModalIds;
  title: string;
  width?: string;
  [key: string]: unknown;
}

const Modal: React.FC<Props> = ({ id, title, children, ...rest }) => {
  const portalRef = usePortal(`Modal_Portal_${id}`);
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
    const target = e.target as HTMLDivElement;

    if (target.id === id) {
      closeModal(id);
    }
  };

  return isMounted
    ? createPortal(
        <ModalContainer onClick={handleOuterClick} {...rest} className="modal" id={id}>
          <ModalStyle width={rest.width} id={`style-${id}`} className={id}>
            <div>
              <ModalHeader>
                {title}
                <CloseModal onClick={() => closeModal(id)}>&times;</CloseModal>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </div>
          </ModalStyle>
        </ModalContainer>,
        portalRef!,
      )
    : null;
};

export default Modal;
