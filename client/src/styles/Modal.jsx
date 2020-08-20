import styled from "styled-components";
import { DARK_GRAY, GREEN } from "./colors";

export const ModalBg = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: all;
  display: none;

  &.active {
    display: block;
  }
`;

export const ModalStyle = styled.div`
  z-index: 110;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  padding: 10px;
  background-color: ${DARK_GRAY};
  width: 600px;
  max-width: 90%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.75);
  transition: transform 200ms;

  &.active {
    transition: transform 0.3s;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const ModalHeader = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${GREEN};
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid ${GREEN};
  margin-bottom: 15px;
`;

export const CloseModal = styled.button`
  padding: 10px;
  color: ${GREEN};
  font-weight: 600;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
`;

export const ModalBody = styled.div``;
