import React from "react";
import { useEffect } from "react";
import { closeModal } from "../../utils/functions";
import {
  ModalStyle,
  ModalHeader,
  ModalBody,
  CloseModal,
  ModalBg,
} from "../../styles/Modal";

const Modal = ({ id, title, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal(id);
      }
    });
  });

  return (
    <>
      <ModalBg id="modalActive"></ModalBg>
      <ModalStyle id={id}>
        <ModalHeader>
          {title}
          <CloseModal onClick={() => closeModal(id)}>&times;</CloseModal>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalStyle>
    </>
  );
};
export default Modal;
