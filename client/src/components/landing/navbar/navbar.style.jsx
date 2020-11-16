import styled, { css } from "styled-components";
import { DEFAULT_MIN_WIDTH } from "../../../styles/constants";

export const NavbarStyle = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: #1c1c1c;
`;

export const NavbarContent = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    width: 85%;
  }
`;

export const NavIcon = styled.a`
  font-size: 1.7rem;
  font-weight: 700;
  text-decoration: none;
`;

export const NavLinks = styled.div``;

export const NavLink = styled.a`
  color: #f2f2f2;
  font-size: 1.2rem;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: 600;

  ${(props) =>
    props.large &&
    css`
      background: #555;
      color: #f2f2f2;
    `}
`;
