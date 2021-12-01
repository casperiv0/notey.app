import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import classNames from "classnames";

export const Switch = React.forwardRef<HTMLButtonElement, JSX.IntrinsicElements["button"]>(
  ({ defaultChecked, ...props }, ref) => {
    const [selected, setSelected] = React.useState(defaultChecked);

    return (
      <SwitchPrimitive.Root
        ref={ref}
        onCheckedChange={() => setSelected((o) => !o)}
        {...(props as any)}
        checked={selected}
        value={selected}
        className="relative h-6 transition-all rounded-full w-11 bg-gray-400/50 dark:bg-dark-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SwitchPrimitive.Thumb
          className={classNames("block w-4 h-4 transition-all rounded-full switch-component", {
            "bg-gray-600/40 dark:bg-gray-600": !selected,
            "bg-dark-4 dark:bg-[#acacac]": selected,
          })}
        />
      </SwitchPrimitive.Root>
    );
  },
);
