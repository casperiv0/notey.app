import React, { useEffect } from "react";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  });

  return <Redirect to="/signin" />;
};

export default connect(null, { logout })(Logout);
