import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
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
import Loader from "@components/loader/Loader";
import Seo from "@components/Seo";
import { authenticate } from "actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const ref = React.useRef<HTMLInputElement>(null);

  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    router.prefetch("/app");

    const data = {
      username,
      password,
      rememberMe,
    };
    const success = await authenticate(data, true);

    if (success) {
      router.push("/app");
    }

    setLoading(false);
  }

  return (
    <>
      <Seo
        description="Authenticate with username and password to gain access to notey.app."
        url="https://notey.caspertheghost.me/auth/login"
        title="Login - notey.app"
      />

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
}
