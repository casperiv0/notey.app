import classNames from "classnames";

export const Spinner = ({ className = "", ...rest }: JSX.IntrinsicElements["div"]) => {
  return (
    <div
      {...rest}
      style={{ borderTopColor: "transparent" }}
      className={classNames(
        "w-5 h-5 border-2 border-dark-3 dark:border-gray-400  border-solid rounded-full animate-spin",
        className,
      )}
    />
  );
};
