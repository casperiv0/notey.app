import { NextPage } from "next";
import { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { useStore } from "../store/store";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps);

  return (
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
};

export default App;
