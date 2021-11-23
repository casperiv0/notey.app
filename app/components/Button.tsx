import * as React from "react";
import classNames from "classnames";
import { Spinner } from "./Spinner";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: keyof typeof variants;
  loading?: boolean;
};

const variants = {
  default: "bg-dark-3 hover:bg-dark-4",
  danger: "bg-red-500 hover:bg-red-600 text-black",
  icon: "bg-transparent hover:bg-dark-4",
  dropdown: "bg-transparent hover:bg-dark-3",
  cancel: "bg-transparent hover:bg-dark-2 mr-1",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, ...props }, ref) => (
    <button
      {...props}
      disabled={typeof loading === "boolean" ? loading : props.disabled}
      className={classNames(
        "p-1 px-3 rounded-md transition-colors cursor-default",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[props.variant ?? "default"],
        loading && "flex justify-center items-center gap-2",
        props.className,
      )}
      ref={ref}
    >
      {loading ? <Spinner /> : null}

      {props.children}
    </button>
  ),
);
