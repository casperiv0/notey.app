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
import { useNetworkStatus } from "@casper124578/useful/hooks/useNetworkStatus";
import UserOfflineError from "@components/UserOfflineError/UserOfflineError";
import "@styles/fonts.css";
import AlertModal, { ModalAction } from "@components/modals/AlertModal";
import { ModalIds } from "@lib/constants";
import { closeModal } from "@lib/utils";

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps?.initialReduxState ?? pageProps);
  const networkStatus = useNetworkStatus();

  if (networkStatus === "offline") {
    return <UserOfflineError />;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ToastContainer pauseOnFocusLoss={false} position="bottom-right" />

      <ReduxProvider store={store}>
        <Component {...pageProps} />

        <AlertModal
          title="Woah!"
          id={ModalIds.AlertTooManyRequests}
          description="You're moving way too fast! Please try again in a few minutes."
          actions={[
            {} as ModalAction,
            {
              name: "OK!",
              onClick: () => closeModal(ModalIds.AlertTooManyRequests),
            },
          ]}
        />
      </ReduxProvider>
    </>
  );
};

export default App;
