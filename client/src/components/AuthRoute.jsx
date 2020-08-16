import React, { useEffect, useState } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuth } from "../actions/auth";

const AuthRouteHandler = ({ component, auth, checkAuth, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const Component = component;

  useEffect(() => {
    checkAuth();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const AuthRoute = withRouter(
  connect(mapStateToProps, { checkAuth })(AuthRouteHandler)
);

export default AuthRoute;
