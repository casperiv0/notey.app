import * as React from "react";

export function usePortal(id = "Unknown"): HTMLDivElement | null {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let el: HTMLDivElement | null = null;

    if (!ref.current) {
      el = document.createElement("div");
      el.setAttribute("id", `Modal_Portal_${id}`);
      document.body.appendChild(el);

      // @ts-expect-error ignore line below
      ref.current = el;
    }

    return () => {
      // @ts-expect-error ignore line below
      ref.current = null;
      document.body.removeChild(el!);
    };
  }, [id]);

  return ref.current;
}
