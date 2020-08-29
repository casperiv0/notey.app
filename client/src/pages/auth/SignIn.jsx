import React, { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn, checkAuth } from "../../actions/auth";
import {
  AuthContainer,
  AuthForm,
  FormGroup,
  FormTitle,
  FormLabel,
  FormInput,
  SubmitBtn,
  FormSmall,
  FormCheckbox,
} from "../../styles/Auth";

const SignIn = ({ signIn, error, isAuth, checkAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      username,
      password,
      rememberMe,
    };
    signIn(data);
  };

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    document.title = "Sign in - Notey.app";
  });

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <AuthContainer>
      <AuthForm onSubmit={onSubmit}>
        <FormGroup>
          <FormTitle>Sign in</FormTitle>
        </FormGroup>
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        <FormGroup>
          <FormLabel htmlFor="username">Username</FormLabel>
          <FormInput
            spellCheck={false}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup inline>
          <FormLabel
            className="more-info"
            aria-label="Remembers your login for 1 month."
            htmlFor="rememberMe"
          >
            Remember me?
          </FormLabel>
          <FormCheckbox
            type="checkbox"
            id="rememberMe"
            value={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
        </FormGroup>
        <FormGroup>
          <SubmitBtn disabled={loading}>
            {loading ? <Loader /> : "Sign in"}
          </SubmitBtn>
        </FormGroup>
        <FormGroup>
          <FormSmall>
            <p>Need an account?</p> <Link to="/signup">Sign Up</Link>
          </FormSmall>
        </FormGroup>
      </AuthForm>
    </AuthContainer>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { signIn, checkAuth })(SignIn);
