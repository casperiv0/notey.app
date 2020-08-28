import React, { useState, useEffect } from "react";
import { signIn } from "../../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import ErrorMessage from "../../components/ErrorMessage/";
import Loader from "../../components/Loader";

const SignIn = ({ signIn, error }) => {
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
    document.title = "Sign in - Notey.app";
  });

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
          <FormLabel htmlFor="rememberMe">Remember me?</FormLabel>
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
});

export default connect(mapStateToProps, { signIn })(SignIn);
