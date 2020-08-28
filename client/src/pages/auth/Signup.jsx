import React, { useState, useEffect } from "react";
import { signUp } from "../../actions/auth";
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
} from "../../styles/Auth";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";

const SignUp = ({ signUp, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      username,
      password,
      password2,
    };
    signUp(data);
  };

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    document.title = "Sign Up - Notey.app";
  });

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
        <FormGroup>
          <FormLabel htmlFor="password2">Confirm Password</FormLabel>
          <FormInput
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <SubmitBtn disabled={loading}>
            {loading ? <Loader /> : "Sign Up"}
          </SubmitBtn>
        </FormGroup>
        <FormGroup>
          <FormSmall>
            Have an account? <Link to="/signin">Sign in</Link>
          </FormSmall>
        </FormGroup>
      </AuthForm>
    </AuthContainer>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, { signUp })(SignUp);
