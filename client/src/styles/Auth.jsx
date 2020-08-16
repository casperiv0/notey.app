import styled from "styled-components";
import { DARK_GRAY, GREEN, LIGHT_GRAY, DARK_GRAY_2 } from "./colors";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${DARK_GRAY};
`;

export const AuthForm = styled.form`
  width: ${(props) => (props.width ? props.width : "500px")};
  max-width: 90%;
  background-color: ${DARK_GRAY};
  padding: 10px 20px;
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.3);
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: ${GREEN};
  border-bottom: 1px solid ${GREEN};
  padding-bottom: 7px;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

export const FormLabel = styled.label`
  margin-bottom: 5px;
  color: ${GREEN};
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 700;
`;

export const FormInput = styled.input`
  padding: 7px;
  font-size: 1.2rem;
  border: 2px solid ${GREEN};
  background-color: ${DARK_GRAY_2};
  color: ${GREEN};
`;

export const SubmitBtn = styled.button`
  padding: 7px;
  font-size: 1.2rem;
  border: 1px solid ${GREEN};
  background-color: ${GREEN};
  color: ${DARK_GRAY};
  cursor: pointer;
  font-weight: 700;
  text-transform: capitalize;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const FormSmall = styled.small`
  color: ${LIGHT_GRAY};
  font-size: 1rem;
  font-weight: 600;

  & a {
    color: ${GREEN};
  }
`;
