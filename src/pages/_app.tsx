import { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { useStore } from "../store/store";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps?.initialReduxState ?? pageProps);

  return (
    <>
      <Head>
        <title>Notey.app - Keep track of important things</title>
      </Head>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </>
  );
};

export default App;
