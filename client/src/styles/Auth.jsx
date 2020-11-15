import styled, { css } from "styled-components";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2f2f2f;
`;

export const AuthForm = styled.form`
  width: ${(props) => (props.width ? props.width : "500px")};
  max-width: 90%;
  max-height: 95%;
  background-color: #2f2f2f;
  padding: 10px 20px;
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.3);

  @media (max-height: 450px) {
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
  color: #f2f2f2;
  border-bottom: 2px solid #5c5c5c;
  padding-bottom: 7px;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

export const FormLabel = styled.label`
  position: relative;
  margin-bottom: 5px;
  color: #f2f2f2;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 700;

  &.more-info::before {
    content: attr(aria-label);
    display: none;
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translate(-50%);
    font-size: 1.2rem;
    color: #f2f2f2;
    width: 350px;
    padding: 10px;
    border-radius: 5px;
    pointer-events: none;
    text-transform: lowercase;
    font-weight: 400;
    background: #555;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  &.more-info:hover::before {
    display: block;
  }
`;

export const FormInput = styled.input`
  padding: 7px;
  font-size: 1.2rem;
  border: 2px solid #5c5c5c;
  background-color: #2f2f2f;
  border-radius: 5px;
  color: #f2f2f2;
  transition: border 200ms;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: #fff;
  }
`;

export const FormCheckbox = styled.input`
  width: 15px;
  height: 15px;
  margin-left: 15px;
`;

export const SubmitBtn = styled.button`
  padding: 7px;
  font-size: 1.2rem;
  border: 1px solid #5c5c5c;
  background-color: #5c5c5c;
  border-radius: 5px;
  color: #f2f2f2;
  cursor: pointer;
  font-weight: 700;
  text-transform: capitalize;
  transition: filter 200ms;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    filter: brightness(120%);
  }
`;

export const FormSmall = styled.small`
  color: #bbb;
  font-size: 1rem;
  font-weight: 600;
  display: flex;

  & a {
    margin-left: 5px;
    color: #f2f2f2;
  }
`;
