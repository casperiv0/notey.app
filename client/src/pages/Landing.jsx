import React, { useEffect } from "react";
import Navbar from "../components/landing/navbar/Navbar";
import Main from "../components/landing/main/Main";
import Footer from "../components/landing/footer/Footer";
import { connect } from "react-redux";
import { checkAuth } from "../actions/auth";

const Landing = ({ checkAuth, isAuth }) => {
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Navbar isAuth={isAuth} />
      <Main isAuth={isAuth} />
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { checkAuth })(Landing);
