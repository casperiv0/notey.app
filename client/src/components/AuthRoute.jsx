import React, { useEffect, useState } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuth } from "../actions/auth";
import Loader from "./Loader";

const AuthRouteHandler = ({ component, auth, checkAuth, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const Component = component;

  useEffect(() => {
    checkAuth();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [checkAuth]);

  if (loading) {
    return <Loader fullSize />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: {
                from: `${props.location.pathname}${props.location.search}`,
              },
            }}
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
