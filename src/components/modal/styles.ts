import { NoteyColors } from "@lib/constants";
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
  background: ${NoteyColors.DarkerGray};
  width: ${(props) => props.width ?? "600px"};
  max-width: 90%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  overflow: hidden;

  & > div {
    max-height: 800px;
    overflow-y: auto;
    scrollbar-width: thin;
    padding: 0.8rem 1rem;
  }

  &.active {
    animation: ${openAni} 150ms linear;
  }

  &.closed {
    animation: ${closeAni} 150ms linear;
  }
`;

export const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background: ${NoteyColors.DarkerGray};
  z-index: 1;

  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${NoteyColors.Text};
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid ${NoteyColors.LightGray};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
`;

export const CloseModal = styled.button`
  color: ${NoteyColors.Text};
  font-weight: 600;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  padding: 1rem;
  transition: background 200ms;
  border-radius: 0.8rem;
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

// optionsModal
export const OptionsModalStyle = styled.div`
  color: ${NoteyColors.Text};
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
  color: ${NoteyColors.Text};
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
  color: ${NoteyColors.Text};
  margin: 1.5rem 0;
`;

export const AlertActions = styled.div`
  display: flex;
  justify-content: space-between;
`;
