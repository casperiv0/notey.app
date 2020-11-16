import styled from "styled-components/macro";

export const MessagesContainer = styled.div`
  position: fixed;
  z-index: 26;
  bottom: 10px;
  right: 10px;
  width: 350px;
  max-width: 95%;
`;

export const AlertMessageStyle = styled.div`
  margin: 5px 0;
  width: 100%;
  background-color: #2f2f2f;
  color: #f2f2f2;
  font-size: 1.2rem;
  padding: 15px 20px;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 200ms;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &.active {
    animation: slideIn 500ms forwards;
  }

  @keyframes slideIn {
    0% {
      transform: translateX(110%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
