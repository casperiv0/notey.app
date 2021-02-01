import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { DEFAULT_MIN_WIDTH } from "../../../styles/constants";
import { DEFAULT_BTN_STYLES } from "../../../styles/Global";

export const NavbarStyle = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: #18191a;
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

export const NavIcon = styled(Link)`
  font-size: 1.7rem;
  font-weight: 700;
  text-decoration: none;
`;

export const NavLinks = styled.div``;

export const NavLink = styled(Link)`
  color: #f2f2f2;
  font-size: 1.2rem;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: 600;

  ${(props) =>
    props.large &&
    css`
      ${DEFAULT_BTN_STYLES}
    `}
`;
