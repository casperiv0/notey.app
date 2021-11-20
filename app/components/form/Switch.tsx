import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export const Switch = (props: JSX.IntrinsicElements["button"]) => {
  return (
    <SwitchPrimitive.Root
      {...props}
      className="relative h-6 transition-all rounded-full w-11 bg-dark-4"
    >
      <SwitchPrimitive.Thumb className="block w-4 h-4 transition-all bg-gray-500 rounded-full switch-component" />
    </SwitchPrimitive.Root>
  );
};
