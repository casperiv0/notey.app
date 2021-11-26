import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export const Switch = React.forwardRef<HTMLButtonElement, JSX.IntrinsicElements["button"]>(
  ({ defaultChecked, ...props }, ref) => {
    const [selected, setSelected] = React.useState(defaultChecked);

    return (
      <SwitchPrimitive.Root
        ref={ref}
        checked={selected}
        onCheckedChange={() => setSelected((o) => !o)}
        value={selected}
        {...(props as any)}
        className="relative h-6 transition-all rounded-full w-11 bg-dark-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SwitchPrimitive.Thumb className="block w-4 h-4 transition-all bg-gray-500 rounded-full switch-component" />
      </SwitchPrimitive.Root>
    );
  },
);
