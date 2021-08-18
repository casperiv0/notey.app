import styled from "styled-components";
import { Styles, NoteyColors } from "lib/constants";

export const ShareStyle = styled.div`
  padding: 1rem;
  color: ${NoteyColors.Text};
`;

export const LinkStyle = styled.a`
  padding: 0.5rem 1rem;
  background: ${NoteyColors.LightGray};
  color: ${NoteyColors.Text};
  display: inline-block;
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
  margin-right: 1rem;
  border-radius: ${Styles.BorderRadius};
`;

export const ShareTitle = styled.h1`
  border-bottom: 0.1rem solid ${NoteyColors.Text};
  padding-bottom: 0.5rem;
  margin: 1rem 0;
`;

export const ShareFooter = styled.footer`
  margin-top: 2rem;
  font-style: italic;
`;
