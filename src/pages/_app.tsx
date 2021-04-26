import { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
import Router from "next/router";
import { Provider as ReduxProvider } from "react-redux";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../store/store";
import "@styles/index.css";
import useHasNetwork from "@hooks/useHasNetwork";
import UserOfflineError from "@components/UserOfflineError/UserOfflineError";

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps?.initialReduxState ?? pageProps);
  const networkStatus = useHasNetwork();

  if (networkStatus === "offline") {
    return <UserOfflineError />;
  }

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
