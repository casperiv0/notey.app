import * as React from "react";

function useModalEvent<T = Element>(id: string) {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const handler = (e) => {
      // "detail" is the dispatched modal ID
      if (e.detail === id) {
        //  @ts-expect-error ignore line below
        ref.current?.focus?.();
      }
    };

    window.addEventListener("modalOpen", handler);

    return () => {
      return window.removeEventListener("modalOpen", handler);
    };
  }, [id]);

  return ref;
}

export default useModalEvent;
