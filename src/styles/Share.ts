import { Styles } from "@lib/constants";
import styled from "styled-components";

export const ShareStyle = styled.div`
  padding: 1rem;
  color: #f2f2f2;
`;

export const LinkStyle = styled.a`
  padding: 0.5rem 1rem;
  background: #3a3b3c;
  color: #f2f2f2;
  display: inline-block;
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
  margin-right: 1rem;
  border-radius: ${Styles.BorderRadius};
`;

export const ShareTitle = styled.h1`
  border-bottom: 0.1rem solid #f2f2f2;
  padding-bottom: 0.5rem;
  margin: 1rem 0;
`;

export const ShareFooter = styled.footer`
  margin-top: 2rem;
  font-style: italic;
`;
