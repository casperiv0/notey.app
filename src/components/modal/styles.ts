import styled, { keyframes } from "styled-components";

const openAni = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const closeAni = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

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

export const ModalStyle = styled.div<{ width?: string }>`
  z-index: 35;
  padding: 0.8rem 1rem;
  background-color: #242526;
  width: ${(props) => props.width ?? "600px"};
  max-width: 90%;
  max-height: 95%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;

  @media (max-height: 1000px) {
    overflow-y: auto;
    scrollbar-width: thin;
  }

  &.active {
    animation: ${openAni} 150ms linear;
  }

  &.closed {
    animation: ${closeAni} 150ms linear;
  }
`;

export const ModalHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f2f2f2;
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #3a3b3c;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
`;

export const CloseModal = styled.button`
  color: #f2f2f2;
  font-weight: 600;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  width: 50px;
  height: 50px;
  transition: background 200ms;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(85, 85, 85, 0.8);
  }

  &:focus {
    background: rgba(85, 85, 85, 0.8);
  }
`;

export const ModalBody = styled.div`
  max-height: 90%;
`;

// OptionsModal
export const OptionsModalStyle = styled.div`
  color: #f2f2f2;
`;

export const OptionsModalContent = styled.div`
  display: grid;
`;

export const OptionsModalBody = styled.div`
  padding: 10px 0;
`;

export const OptionsModalFooter = styled.div`
  border-top: 2px solid #5c5c5c;
  padding: 10px 0;
  color: #f2f2f2;
  font-size: 1.2rem;
  text-align: center;

  & a {
    color: #f5f5f5;
    text-decoration: underline;
  }
`;

// alertModal
export const AlertDescription = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  margin: 1.5rem 0;
`;

export const AlertActions = styled.div`
  display: flex;
  justify-content: space-between;
`;
