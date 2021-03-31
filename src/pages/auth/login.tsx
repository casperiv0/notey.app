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
  FormCheckbox,
} from "@styles/Auth";
import { RequestData } from "@lib/fetch";
import State from "types/State";
import Loader from "@components/loader/Loader";

interface Props {
  authenticate: (data: RequestData, login: boolean) => Promise<boolean>;
  loading: boolean;
}

const LoginPage: NextPage<Props> = ({ loading, authenticate }) => {
  const router = useRouter();
  const ref = React.useRef<HTMLInputElement>(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      username,
      password,
      rememberMe,
    };
    const success = await authenticate(data, true);

    if (success) {
      router.push("/app");
    }
  }

  return (
    <>
      <Head>
        <title>Login - notey.app</title>
      </Head>
      <AuthContainer>
        <AuthForm onSubmit={onSubmit}>
          <FormGroup>
            <FormTitle>Login</FormTitle>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="username">Username</FormLabel>
            <FormInput
              ref={ref}
              autoComplete="username"
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
              autoComplete="password"
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
              value={`${rememberMe}`}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </FormGroup>
          <FormGroup>
            <SubmitBtn disabled={loading}>{loading ? <Loader size={9} /> : "Login"}</SubmitBtn>
          </FormGroup>
          <FormGroup>
            <FormSmall>
              <Link href="/auth/register">
                <a href="/auth/register">Need an account? Register</a>
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

export default connect(mapToProps, { authenticate })(LoginPage);
