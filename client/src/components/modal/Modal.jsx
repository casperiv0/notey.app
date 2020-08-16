import React from "react";
import { useEffect } from "react";
import {
  ModalStyle,
  ModalHeader,
  ModalBody,
  CloseModal,
  ModalBg,
} from "../../styles/Modal";

const Modal = ({ id, title, children }) => {
  const closeModal = () => {
    document.getElementById(id).classList.remove("active");
    document.getElementById(id + "Bg").classList.remove("active");
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    })
  })

  return (
    <>
      <ModalBg id={id+"Bg"} onClick={closeModal}></ModalBg>
      <ModalStyle id={id}>
        <ModalHeader>
          {title} <CloseModal onClick={closeModal}>&times;</CloseModal>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalStyle>
    </>
  );
};
export default Modal;
