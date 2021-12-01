import * as React from "react";
import classNames from "classnames";

type Props = JSX.IntrinsicElements["select"];

export const Select = React.forwardRef<HTMLSelectElement, Props>((props, ref) => (
  <select
    {...props}
    className={classNames(
      [
        "dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-6 dark:focus:border-gray-300",
        "bg-gray-200/50 border-gray-300 focus:border-dark-6",
      ],
      "p-1.5 px-3 border-[1.5px] rounded-md transition-colors",
      props.className,
    )}
    ref={ref}
  />
));
