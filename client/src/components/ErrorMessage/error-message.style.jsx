import styled from "styled-components";
import { PRIMARY, GREEN } from "../../styles/colors";

export const ErrorBox = styled.div`
  background-color: ${GREEN};
  padding: 5px;
  margin-bottom: 15px;
`;

export const ErrorBody = styled.p`
  color: ${PRIMARY};
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
`;
