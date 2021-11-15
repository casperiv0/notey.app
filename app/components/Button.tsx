import * as React from "react";
import classNames from "classnames";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: keyof typeof variants;
};

const variants = {
  default: "bg-gray-300 hover:bg-gray-400",
  danger: "bg-red-500 hover:bg-red-600 text-black",
  icon: "bg-transparent hover:bg-gray-400",
  dropdown: "bg-transparent hover:bg-gray-200",
  cancel: "bg-transparent",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button
    {...props}
    className={classNames(
      "p-1 px-3 rounded-md transition-colors",
      variants[props.variant ?? "default"],
      props.className,
    )}
    ref={ref}
  />
));
