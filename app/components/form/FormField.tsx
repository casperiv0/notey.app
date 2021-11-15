import { useField } from "@react-aria/label";
import * as React from "react";

type Props = JSX.IntrinsicElements["div"] & {
  label: string | null;
  errorMessage?: string;
  children?: React.ReactElement<any>;
};

export const FormField = ({ label, errorMessage, children, ...rest }: Props) => {
  const { labelProps, fieldProps, errorMessageProps } = useField({ label, errorMessage });

  const element = React.cloneElement(children as React.ReactElement<any>, fieldProps);

  return (
    <div {...rest} className="flex flex-col mb-3">
      <label {...labelProps} className="mb-1">
        {label}
      </label>

      {element}

      {errorMessage ? (
        <span {...errorMessageProps} className="mt-1 font-medium text-red-600">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};
