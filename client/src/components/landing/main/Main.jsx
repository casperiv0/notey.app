import React from "react";
import { RowCenter } from "../../../styles/Global";
import {
  MainContainer,
  MainStyle,
  ShowCase,
  ShowCaseTitle,
  ShowCaseParaph,
  ShowCaseImg,
  ShowCaseLink,
  ShowCaseInfo,
} from "./main.style";

const Main = ({ isAuth }) => {
  return (
    <MainContainer>
      <MainStyle>
        <ShowCase>
          <div>
            <ShowCaseTitle>Keep track of important things</ShowCaseTitle>
            <ShowCaseParaph>
              Notes app to keep track of the most important things securely and
              easy.
            </ShowCaseParaph>
            <RowCenter>
              {isAuth ? (
                <ShowCaseLink href="/#/app">Open App</ShowCaseLink>
              ) : (
                <ShowCaseLink href="/#/signup">Sign up</ShowCaseLink>
              )}
              <ShowCaseInfo>Available in all latest browsers</ShowCaseInfo>
            </RowCenter>
          </div>
          <ShowCaseImg width="100%" height="100%" src="/showcase.svg" alt="Showcase" />
        </ShowCase>
      </MainStyle>
    </MainContainer>
  );
};

export default Main;
