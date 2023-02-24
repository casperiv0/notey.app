import * as React from "react";
import { BaseEditor, Descendant, createEditor } from "slate";
import { Editable, ReactEditor, RenderLeafProps, Slate, withReact } from "slate-react";
import { type HistoryEditor, withHistory } from "slate-history";
import { Toolbar } from "./toolbar/Toolbar";
import { toggleMark } from "~/lib/editor/utils";
import isHotkey from "is-hotkey";
import { withShortcuts } from "~/lib/editor/withShortcuts";
import { withChecklists } from "~/lib/editor/withChecklists";
import type { SlateElements, Text } from "./types";
import { HoverToolbar } from "./toolbar/HoverToolbar";
import { withLinks } from "~/lib/editor/withLinks";
import { EditorElement } from "./elements";

export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: SlateEditor;
    Element: SlateElements;
    Text: Text;
  }
}

interface EditorProps {
  isReadonly?: boolean;
  value: any;
  onChange?(value: Descendant[]): void;
  isShare?: boolean;
}

export const DEFAULT_EDITOR_DATA = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
] as Descendant[];

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+s": "strikethrough",
} as const;

export function SlateEditor({ isReadonly, value, isShare, onChange }: EditorProps) {
  const renderElement = React.useCallback((props) => <EditorElement {...props} />, []);
  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);
  const editor = React.useMemo(
    () => withLinks(withChecklists(withShortcuts(withHistory(withReact(createEditor()))))),
    [],
  );

  function handleChange(value: Descendant[]) {
    onChange?.(value);
  }

  // handle state changes
  React.useEffect(() => {
    editor.children = value;
    editor.onChange();
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="mt-1 px-3"
      data-editor-preview={!isShare}
      style={{ height: "calc(100vh - 4rem)", overflowY: "auto" }}
    >
      <Slate editor={editor} value={value} onChange={handleChange}>
        {isReadonly ? null : (
          <>
            <Toolbar />
            <HoverToolbar />
          </>
        )}

        <Editable
          spellCheck="false"
          autoComplete="off"
          readOnly={isReadonly}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          className="w-full p-1.5 rounded-md bg-transparent disabled:cursor-not-allowed disabled:opacity-80"
          placeholder="Start typing..."
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey)(event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}

function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }

  if (leaf["inline-code"]) {
    children = (
      <code className="bg-neutral-300 dark:bg-dark-3 p-0.5 px-1 rounded-md">{children}</code>
    );
  }

  return <span {...attributes}>{children}</span>;
}
