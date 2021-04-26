// Thanks to https://dev.to/nialljoemaher/detecting-if-a-user-is-online-offline-with-javascript-3bcc
import * as React from "react";

export type Status = "online" | "offline" | null;

export default function useHasNetwork() {
  const [status, setStatus] = React.useState<Status>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (online: boolean) => () => {
      setStatus(online === true ? "online" : "offline");
    };

    window.addEventListener("load", handler(navigator.onLine));
    window.addEventListener("online", handler(true));
    window.addEventListener("offline", handler(false));

    return () => {
      window.removeEventListener("load", handler(navigator.onLine));
      window.removeEventListener("online", handler(true));
      window.removeEventListener("offline", handler(false));
    };
  }, []);

  return status;
}
