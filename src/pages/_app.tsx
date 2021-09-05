import * as React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@styles/index.css";
import { useNetworkStatus } from "@casper124578/useful/hooks/useNetworkStatus";
import UserOfflineError from "@components/UserOfflineError/UserOfflineError";
import "@styles/fonts.css";
import { AlertModal, ModalAction } from "@components/modals/AlertModal";
import { ModalIds, NoteyColors } from "lib/constants";
import { closeModal } from "lib/utils";
import { StoreProvider } from "store/StoreProvider";

const toastStyles: React.CSSProperties = {
  minWidth: "300px",
  maxWidth: "95%",
  padding: "0.5rem 1rem",
  fontSize: "1rem",

  background: NoteyColors.DarkGray,
  color: NoteyColors.White,
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const networkStatus = useNetworkStatus();
  const router = useRouter();
  const position = router.pathname.includes("/auth") ? "top-right" : "bottom-right";

  React.useEffect(() => {
    function handleRouteStart() {
      NProgress.start();
    }
    function handleRouteDone() {
      NProgress.done();
    }

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  if (networkStatus === "offline") {
    return <UserOfflineError />;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Toaster
        position={position}
        toastOptions={{
          style: toastStyles,
          error: {
            style: { fontWeight: 500 },
          },
        }}
      />

      <StoreProvider initState={pageProps.initialState ?? {}}>
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
      </StoreProvider>
    </>
  );
};

export default App;
