import type * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, ButtonProps } from "~/components/Button";
import { X } from "react-bootstrap-icons";
import { useId } from "react-aria";
import { useModal } from "~/lib/useModal";
import classNames from "classnames";

interface Props {
  id: string;

  children: React.ReactNode;
  title: React.ReactFragment | string;
  description?: React.ReactFragment | string;
  extra?: { width?: number; isAlert?: boolean; forceOpen?: boolean };
}

export const Modal = ({ id, children, description, title, extra }: Props) => {
  const closeId = useId();
  const { isOpen, closeModal } = useModal();
  const width = extra?.width ?? 500;
  const isAlert = extra?.isAlert ?? false;
  const isModalOpen = typeof extra?.forceOpen !== "undefined" ? extra.forceOpen : isOpen(id);

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={(v) => !v && closeModal(id)}>
      <Dialog.Overlay className="fixed inset-0 bg-black/20" />

      <Dialog.Content
        style={{ width, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
        className="bg-gray-100 dark:bg-dark-1 rounded-md shadow-lg fixed max-w-[95%] p-5 modalOpen"
      >
        <header className="flex justify-between">
          <Dialog.Title className="mb-1 text-2xl font-semibold">{title}</Dialog.Title>
          <div>
            <Dialog.Close className="h-8" id={closeId} aria-label="Close modal" asChild>
              <Button variant="cancel" className="px-1 rounded-md">
                <X width={25} height={25} aria-labelledby={closeId} />
              </Button>
            </Dialog.Close>
          </div>
        </header>

        {description ? (
          <Dialog.Description
            className={classNames("text-lg text-dark-4 dark:text-gray-400", isAlert && "my-2")}
          >
            {description}
          </Dialog.Description>
        ) : null}

        <div>{children}</div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

Modal.Close = (props: ButtonProps) => (
  <Dialog.Close asChild>
    <Button {...(props as any)} />
  </Dialog.Close>
);
