import styled, { css } from "styled-components";
import { Size } from "@lib/constants";
import { DEFAULT_BTN_STYLES } from "./Global";

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

  @media (min-width: ${Size.DefaultMinWidth}) {
    width: 1200px;
    max-width: 95%;
  }
`;

export const NavIcon = styled.a`
  font-size: 1.7rem;
  font-weight: 700;
  text-decoration: none;
`;

export const NavLinks = styled.div``;

export const NavLink = styled.a<{ large?: boolean }>`
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

export const MainContainer = styled.main`
  display: flex;
  justify-content: center;
`;

export const MainStyle = styled.div`
  --height: 307.5px;
  width: 90%;
  min-height: calc(100vh - var(--height));
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 75px;

  @media (min-width: ${Size.DefaultMinWidth}) {
    --height: 277.5px;
    width: 1200px;
    max-width: 95%;
    height: calc(100vh - var(--height));
    justify-content: center;
  }
`;

export const ShowCase = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 50px;

  @media (min-width: ${Size.DefaultMinWidth}) {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }
`;

export const ShowCaseTitle = styled.h1`
  font-size: clamp(3rem, 5vw, 4.5rem);
  color: white;
  margin-bottom: 10px;
`;

export const ShowCaseParaph = styled.p`
  margin-bottom: 20px;
  color: #f9f9f9;
  font-size: 1.5rem;
`;

export const ShowCaseLink = styled.a`
  ${DEFAULT_BTN_STYLES}
  padding: 0.6rem 2rem !important;
  text-decoration: none;
  font-weight: 600;
`;

export const ShowCaseInfo = styled.p`
  color: #f2f2f2;
  font-size: 1.2rem;
  margin-left: 20px;
  display: none;

  @media (min-width: 450px) {
    display: block;
  }
`;

export const ShowCaseImg = styled.img`
  width: 100%;
`;

export const FooterStyle = styled.footer`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  background: #18191a;

  @media (min-width: ${Size.DefaultMinWidth}) {
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

  @media (min-width: ${Size.DefaultMinWidth}) {
    width: 1200px;
    flex-direction: row;
  }
`;

export const FooterIcon = styled.img`
  width: 75px;
  height: 75px;
  display: none;

  @media (min-width: ${Size.DefaultMinWidth}) {
    display: block;
  }
`;

export const FooterTitle = styled.h1`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: normal;
  text-align: center;

  & a {
    margin-right: 0;
    color: #f2f2f2;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterLink = styled.a`
  font-size: 1.2rem;
  color: #f2f2f2;
  font-weight: 600;
  margin-top: 10px;
`;
