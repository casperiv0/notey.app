import styled from "styled-components/macro";
import { DEFAULT_MIN_WIDTH } from "../../../styles/constants";
import { DEFAULT_BTN_STYLES } from "../../../styles/Global";

export const MainContainer = styled.main`
  display: flex;
  justify-content: center;
`;

export const MainStyle = styled.div`
  width: 90%;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    width: 85%;
    height: calc(100vh - 80px);
  }
`;

export const ShowCase = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 50px;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ShowCaseTitle = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 10px;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    font-size: 4.5rem;
  }

  @media (max-width: 360px) {
    font-size: 2rem;
  }
`;

export const ShowCaseParaph = styled.p`
  margin-bottom: 20px;
  color: #f9f9f9;
  font-size: 1.5rem;
`;

export const ShowCaseLink = styled.a`
  ${DEFAULT_BTN_STYLES}
  padding: 10px 40px !important;
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
