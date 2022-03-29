import { useField } from "@react-aria/label";
import classNames from "classnames";
import * as React from "react";

type Props = JSX.IntrinsicElements["div"] & {
  label: string | null;
  errorMessage?: string;
  children?: React.ReactElement<any>;
  checkbox?: boolean;
  optional?: boolean;
};

export const FormField = ({
  label,
  checkbox,
  errorMessage,
  children,
  optional,
  ...rest
}: Props) => {
  const { labelProps, fieldProps, errorMessageProps } = useField({ label, errorMessage });

  // first child must be an input, textarea, select, etc. (form elements)
  const [child, ...otherChildren] = Array.isArray(children) ? children : [children];

  const element = React.cloneElement(child as React.ReactElement, {
    ...fieldProps,
  });

  return (
    <div {...rest} className={classNames("flex mb-3", !checkbox && "flex-col", rest.className)}>
      <label {...labelProps} className={classNames("mb-1", checkbox && "mr-3")}>
        {label} {optional ? <span className="text-sm italic">(Optional)</span> : null}
      </label>

      {element}
      {otherChildren}

      {errorMessage ? (
        <span {...errorMessageProps} className="mt-1 font-medium text-red-500">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};
