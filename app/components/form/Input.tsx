import * as React from "react";
import classNames from "classnames";

type Props = JSX.IntrinsicElements["input"];

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input
    {...props}
    className={classNames(
      "p-1.5 px-3 border-[1.5px] border-gray-300 rounded-md transition-colors",
      props.className,
    )}
    ref={ref}
  />
));
