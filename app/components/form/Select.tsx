import * as React from "react";
import classNames from "classnames";

type Props = JSX.IntrinsicElements["select"];

export const Select = React.forwardRef<HTMLSelectElement, Props>((props, ref) => (
  <select
    {...props}
    className={classNames(
      "p-1.5 px-3 border-[1.5px] border-gray-300 bg-white rounded-md transition-colors",
      props.className,
    )}
    ref={ref}
  />
));
