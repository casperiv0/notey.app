import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { Link, LinkProps } from "remix";
import { Button, ButtonProps } from "~/components/Button";

interface Props extends DropdownMenu.MenuContentProps {
  trigger: any;
  children: React.ReactNode;
  extra?: { maxWidth?: number };
}

export const Dropdown = ({ trigger: Trigger, children, extra, ...rest }: Props) => {
  const maxWidth = extra?.maxWidth ?? 300;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="dropdown-button" asChild>
        {Trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={3}
        style={{ width: maxWidth, maxWidth }}
        className="p-2 bg-gray-300 rounded-md shadow-md dark:bg-dark-4 fadeUp"
        align="start"
        {...rest}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

Dropdown.Separator = (props: any) => <DropdownMenu.Separator {...props} className="my-1" />;
Dropdown.Label = (props: any) => (
  <DropdownMenu.Label {...props} className="mb-1 text-base font-medium uppercase" />
);
Dropdown.LinkItem = (props: LinkProps) => (
  <DropdownMenu.Item asChild>
    <Link
      {...props}
      className="block p-1 my-0.5 px-1.5 rounded-md transition-colors w-full text-left bg-transparent hover:bg-gray-400 dark:hover:bg-dark-3"
    />
  </DropdownMenu.Item>
);
Dropdown.Item = ({ children, command, ...rest }: ButtonProps & { command?: string }) => (
  <DropdownMenu.Item asChild>
    <Button
      variant="dropdown"
      {...(rest as any)}
      className={classNames("p-1 my-0.5 px-1.5 rounded-md transition-colors w-full text-left", {
        "flex items-center justify-between": !!command,
      })}
    >
      {children}

      {command ? (
        <span
          role=""
          className={classNames(
            "p-0.5 px-1.5 rounded-md text-sm",
            rest.variant === "danger" ? "bg-red-800 text-white" : "bg-gray-500/50 dark:bg-dark-5",
          )}
        >
          {command}
        </span>
      ) : null}
    </Button>
  </DropdownMenu.Item>
);
