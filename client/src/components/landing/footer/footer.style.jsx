import styled from "styled-components/macro";
import { DEFAULT_MIN_WIDTH } from "../../../styles/constants";

export const FooterStyle = styled.footer`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    height: 120px;
    padding: 20px;
  }
`;

export const FooterContent = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    width: 80%;
    flex-direction: row;
  }
`;

export const FooterIcon = styled.img`
  width: 75px;
  height: 75px;
  display: none;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    display: block;
  }
`;

export const FooterTitle = styled.h1`
  color: #2f2f2f;
  font-size: 1.2rem;
  font-weight: normal;
  text-align: center;

  & a {
    margin-right: 0;
    color: #555;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterLink = styled.a`
  font-size: 1.2rem;
  color: #555;
  font-weight: 600;
  margin-top: 10px;
`;
