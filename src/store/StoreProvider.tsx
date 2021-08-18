import * as React from "react";
import { AppStore } from "./AppStore";
import { makeStore } from "./makeStore";

const StoreContext = React.createContext<AppStore>(new AppStore());

interface StoreProps {
  initState: Record<string, unknown>;
  children: React.ReactChild[] | React.ReactChild;
}

export const StoreProvider = ({ initState, children }: StoreProps) => {
  const store = React.useMemo(() => makeStore(initState), [initState]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export function useStore() {
  return React.useContext(StoreContext);
}
