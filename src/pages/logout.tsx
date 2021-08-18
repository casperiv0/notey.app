import * as React from "react";
import { logout } from "actions/auth";
import { useRouter } from "next/router";
import { useStore } from "store/StoreProvider";
import { observer } from "mobx-react-lite";

const Logout = () => {
  const router = useRouter();
  const store = useStore();

  const handleLogout = React.useCallback(async () => {
    const data = await logout();

    store.hydrate(data);

    router.push("/");
  }, [store, router]);

  React.useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return <p>Logging you out...</p>;
};

export default observer(Logout);
