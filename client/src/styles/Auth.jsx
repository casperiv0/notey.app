import styled, { css } from "styled-components";
import { PRIMARY, GREEN, LIGHT_GRAY, DARK_GRAY_2 } from "./colors";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY};
`;

export const AuthForm = styled.form`
  width: ${(props) => (props.width ? props.width : "500px")};
  max-width: 90%;
  max-height: 95%;
  background-color: ${PRIMARY};
  padding: 10px 20px;
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.3);

  @media (max-height: 750px) {
    overflow-y: scroll;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.inline &&
    css`
      display: flex;
      flex-direction: row;
      align-items: center;
    `}
`;

export const FormTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: ${GREEN};
  border-bottom: 2px solid ${GREEN};
  padding-bottom: 7px;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

export const FormLabel = styled.label`
  position: relative;
  margin-bottom: 5px;
  color: ${GREEN};
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 700;

  &.more-info::before {
    content: attr(aria-label);
    display: none;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%);
    font-size: 1.2rem;
    color: ${GREEN};
    width: 350px;
    padding: 10px;
    background-color: ${DARK_GRAY_2};
    border-radius: 5px;
    pointer-events: none;
    text-transform: lowercase;
    font-weight: 400;
  }

  &.more-info:hover::before {
    display: block;
  }
`;

export const FormInput = styled.input`
  padding: 7px;
  font-size: 1.2rem;
  border: 2px solid ${GREEN};
  background-color: ${DARK_GRAY_2};
  color: ${GREEN};
  border-radius: 0;
`;

export const FormCheckbox = styled.input`
  width: 15px;
  height: 15px;
  margin-left: 15px;
`;

export const SubmitBtn = styled.button`
  padding: 7px;
  font-size: 1.2rem;
  border: 1px solid ${GREEN};
  background-color: ${GREEN};
  color: ${PRIMARY};
  cursor: pointer;
  font-weight: 700;
  text-transform: capitalize;
  border-radius: 0;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const FormSmall = styled.small`
  color: ${LIGHT_GRAY};
  font-size: 1rem;
  font-weight: 600;
  display: flex;

  & a {
    margin-left: 5px;
    color: ${GREEN};
  }
`;
