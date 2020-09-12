import styled from "styled-components";
import { PRIMARY, GREEN } from "../../styles/colors";

export const ModalContainer = styled.div`
  z-index: 30;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  display: none;
  align-items: center;
  justify-content: center;

  &.active {
    display: flex;
  }
`;

export const ModalStyle = styled.div`
  z-index: 35;
  padding: 10px;
  background-color: ${PRIMARY};
  width: 600px;
  max-width: 90%;
  max-height: 95%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  transition: transform 200ms;

  @media (max-height: 680px) {
    overflow-y: scroll;
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

export const ModalBody = styled.div`
  max-height: 90%;
`;

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
