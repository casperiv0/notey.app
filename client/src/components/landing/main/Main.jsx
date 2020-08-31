import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuth } from "../../../actions/auth";
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

const Main = ({ isAuth, checkAuth }) => {
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
          <ShowCaseImg src="/showcase.svg" alt="Showcase" />
        </ShowCase>
      </MainStyle>
    </MainContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { checkAuth })(Main);
