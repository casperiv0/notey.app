import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";
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

const SignIn = ({ signIn, isAuth, checkAuth, loading, location }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const from = location && location.state && location.state.from;

  async function onSubmit(e) {
    e.preventDefault();

    const data = {
      username,
      password,
      rememberMe,
    };
    const success = await signIn(data, from);

    if (success) {
      history.push(from || "app");
    }
  }

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    document.title = "Sign in - Notey.app";
  });

  if (isAuth) {
    return <Redirect to="/app" />;
  }

  return (
    <AuthContainer>
      <ToastContainer />
      <AuthForm onSubmit={onSubmit}>
        <FormGroup>
          <FormTitle>Sign in</FormTitle>
        </FormGroup>
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
          <SubmitBtn disabled={loading}>{loading ? <Loader /> : "Sign in"}</SubmitBtn>
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
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { signIn, checkAuth })(SignIn);
