import React, { useState, useEffect } from "react";
import { signUp, checkAuth } from "../../actions/auth";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  AuthContainer,
  AuthForm,
  FormGroup,
  FormTitle,
  FormLabel,
  FormInput,
  SubmitBtn,
  FormSmall,
} from "../../styles/Auth";
import ErrorMessage from "../../components/ErrorMessage/";
import Loader from "../../components/Loader";

const SignUp = ({ signUp, error, isAuth, checkAuth, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
      password2,
    };
    signUp(data);
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    document.title = "Sign Up - Notey.app";
  });

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <AuthContainer>
      <AuthForm onSubmit={onSubmit}>
        <FormGroup>
          <FormTitle>Sign Up</FormTitle>
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
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password2">Confirm Password</FormLabel>
          <FormInput
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <SubmitBtn disabled={loading}>
            {loading ? <Loader /> : "Sign Up"}
          </SubmitBtn>
        </FormGroup>
        <FormGroup>
          <FormSmall>
            <p>Have an account?</p> <Link to="/signin">Sign in</Link>
          </FormSmall>
        </FormGroup>
      </AuthForm>
    </AuthContainer>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { signUp, checkAuth })(SignUp);
