import * as React from "react";
import classNames from "classnames";

type Props = JSX.IntrinsicElements["input"];

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input
    {...props}
    className={classNames(
      "p-1.5 px-3 border-[1.5px] border-dark-3 bg-dark-2 rounded-md transition-colors hover:border-dark-6 focus:border-gray-300",
      props.className,
    )}
    ref={ref}
  />
));
