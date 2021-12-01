import { Modals } from "~/lib/constants";
import { Modal } from "./Modal";

export const KeyboardShortcutsModal = () => {
  return (
    <Modal extra={{ width: 600 }} title="Keyboard Shortcuts" id={Modals.KeyboardShortcuts}>
      <div className="grid w-full grid-cols-2 mt-5 gap-7">
        <KeyboardShortcut name="manage account" shortcut="shift+a" />
        <KeyboardShortcut name="logout" shortcut="shift+alt+l" />
        <KeyboardShortcut name="create new category" shortcut="shift+alt+n" />
        <KeyboardShortcut name="create new note" shortcut="shift+n" />
        <KeyboardShortcut name="manage current note" shortcut="shift+m" />
        <KeyboardShortcut name="delete current note" shortcut="shift+alt+d" />
        <KeyboardShortcut name="clone current note" shortcut="shift+c" />

        <div className="w-full" />

        <KeyboardShortcut name="goto next note" shortcut="shift+alt+up" />
        <KeyboardShortcut name="goto previous note" shortcut="shift+alt+down" />

        <KeyboardShortcut name="keyboard shortcuts" shortcut="shift+k" />
      </div>
    </Modal>
  );
};

const KeyboardShortcut = ({ name, shortcut }: { name: string; shortcut: string }) => (
  <div className="flex flex-col">
    <p style={{ fontSize: "0.95rem" }} className="mb-1.5 font-semibold uppercase">
      {name}
    </p>
    <p>
      <kbd className="px-1.5 p-1 bg-gray-300 dark:bg-dark-3 rounded-md">{shortcut}</kbd>
    </p>
  </div>
);
