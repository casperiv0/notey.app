import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button, ButtonProps } from "~/components/Button";

interface Props {
  trigger: any;
  children: React.ReactNode;
  extra?: { maxWidth?: number };
}

export const Dropdown = ({ trigger: Trigger, children, extra }: Props) => {
  const maxWidth = extra?.maxWidth ?? 300;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{Trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Content
        style={{ width: maxWidth, maxWidth }}
        className="p-2 bg-white rounded-md rounded-tr-none shadow-md fadeUp"
        align="end"
      >
        {children}

        <DropdownMenu.Arrow className="text-white fill-current" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

Dropdown.Separator = (props: any) => <DropdownMenu.Separator {...props} className="my-1" />;
Dropdown.Label = (props: any) => (
  <DropdownMenu.Label {...props} className="mb-1 text-base font-medium uppercase" />
);
Dropdown.Item = (props: ButtonProps) => (
  <DropdownMenu.Item asChild>
    <Button
      variant="dropdown"
      {...(props as any)}
      className="p-0.5 my-0.5 px-1.5 rounded-md transition-colors w-full text-left cursor-default"
    />
  </DropdownMenu.Item>
);
