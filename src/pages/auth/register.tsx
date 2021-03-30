import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { connect } from "react-redux";
import { authenticate } from "@actions/auth";
import {
  AuthContainer,
  AuthForm,
  FormGroup,
  FormTitle,
  FormLabel,
  FormInput,
  SubmitBtn,
  FormSmall,
} from "@styles/Auth";
import { RequestData } from "@lib/fetch";
import State from "types/State";
import Loader from "@components/loader/Loader";

interface Props {
  authenticate: (data: RequestData) => Promise<boolean>;
  loading: boolean;
}

const Register: NextPage<Props> = ({ authenticate, loading }) => {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      username,
      password,
      password2,
    };
    const success = await authenticate(data);

    if (success) {
      return router.push("/app");
    }
  }

  return (
    <>
      <Head>
        <title>Register - notey.app</title>
      </Head>
      <AuthContainer>
        <AuthForm onSubmit={onSubmit}>
          <FormGroup>
            <FormTitle>Sign Up</FormTitle>
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
            <SubmitBtn disabled={loading}>{loading ? <Loader /> : "Sign Up"}</SubmitBtn>
          </FormGroup>
          <FormGroup>
            <FormSmall>
              <Link href="/auth/login">
                <a href="/auth/login">Have an account? Login</a>
              </Link>
            </FormSmall>
          </FormGroup>
        </AuthForm>
      </AuthContainer>
    </>
  );
};

const mapToProps = (state: State) => ({
  loading: state.auth.loading,
});

export default connect(mapToProps, { authenticate })(Register);
