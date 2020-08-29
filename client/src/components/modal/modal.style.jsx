import styled from "styled-components";
import { PRIMARY, GREEN } from "../../styles/colors";

export const ModalBg = styled.div`
  z-index: 30;
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
  z-index: 35;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  padding: 10px;
  background-color: ${PRIMARY};
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
  border-bottom: 2px solid ${GREEN};
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

// OptionsModal
export const OptionsModalStyle = styled.div`
  color: ${GREEN};
`;

export const OptionsModalContent = styled.div`
  display: grid;
  grid-template-rows: auto 50px;
`;

export const OptionsModalBody = styled.div`
  padding: 10px 0;
`;

export const OptionsModalFooter = styled.div`
  border-top: 2px solid ${GREEN};
  padding: 10px 0;
  color: ${GREEN};
  font-size: 1.2rem;
  text-align: center;

  & a {
    color: ${GREEN};
    text-decoration: underline;
  }
`;
