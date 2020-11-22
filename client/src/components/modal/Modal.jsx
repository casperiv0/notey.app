import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/functions";
import {
  ModalStyle,
  ModalHeader,
  ModalBody,
  CloseModal,
  ModalContainer,
} from "./modal.style";

const Modal = ({ id, title, children, ...rest }) => {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal(id);
      }
    });
  });

  return createPortal(
    <ModalContainer {...rest} className="modal" id={id}>
      <ModalStyle id={`style-${id}`} className={id}>
        <ModalHeader>
          {title}
          <CloseModal onClick={() => closeModal(id)}>&times;</CloseModal>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalStyle>
    </ModalContainer>,
    document.getElementById("modal-portal")
  );
};
export default Modal;
