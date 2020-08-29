import React from "react";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { closeModal } from "../../utils/functions";
import {
  ModalStyle,
  ModalHeader,
  ModalBody,
  CloseModal,
  ModalBg,
} from "./modal.style";

const Modal = ({ id, title, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal(id);
      }
    });
  });

  return createPortal(
    <>
      <ModalBg id="modalActive"></ModalBg>
      <ModalStyle id={id}>
        <ModalHeader>
          {title}
          <CloseModal onClick={() => closeModal(id)}>&times;</CloseModal>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalStyle>
    </>,
    document.getElementById("modal-portal")
  );
};
export default Modal;
