import { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../store/store";
import "@styles/index.css";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps?.initialReduxState ?? pageProps);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ToastContainer position="bottom-right" />

      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </>
  );
};

export default App;
