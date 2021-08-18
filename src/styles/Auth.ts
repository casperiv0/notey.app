import styled, { css } from "styled-components";
import { NoteyColors, Styles } from "lib/constants";
import { DEFAULT_BTN_STYLES, DEFAULT_INPUT_STYLES } from "./Global";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${NoteyColors.Dark};
`;

export const AuthForm = styled.form<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "500px")};
  max-width: 90%;
  max-height: 95%;
  background: ${NoteyColors.DarkerGray};
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

  @media (max-height: 450px) {
    overflow-y: scroll;
  }
`;

export const FormGroup = styled.div<{ inline?: boolean }>`
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
  color: ${NoteyColors.Text};
  border-bottom: 2px solid #5c5c5c;
  padding-bottom: 7px;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

export const FormLabel = styled.label`
  position: relative;
  margin-bottom: 5px;
  color: ${NoteyColors.Text};
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
    color: ${NoteyColors.Text};
    width: 350px;
    padding: 10px;
    border-radius: ${Styles.BorderRadius};
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
  ${DEFAULT_INPUT_STYLES}
`;

export const FormCheckbox = styled.input`
  width: 15px;
  height: 15px;
  margin-left: 15px;
`;

export const SubmitBtn = styled.button`
  ${DEFAULT_BTN_STYLES}

  &:disabled {
    cursor: not-allowed;
  }
`;

export const FormSmall = styled.small`
  color: ${NoteyColors.Text};
  font-size: 1rem;
  font-weight: 600;
  display: flex;

  & a {
    margin-left: 5px;
    color: ${NoteyColors.Text};
  }
`;
