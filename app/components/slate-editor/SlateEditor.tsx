import * as React from "react";
import { BaseEditor, Descendant, createEditor } from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { type HistoryEditor, withHistory } from "slate-history";
import { Toolbar } from "./toolbar/Toolbar";
import { toggleMark } from "~/lib/editor/utils";
import isHotkey from "is-hotkey";
import { withShortcuts } from "~/lib/editor/withShortcuts";
import { withChecklists } from "~/lib/editor/withChecklists";
import { CheckListItemElement } from "./elements/ChecklistItem";
import { LinkElement } from "./elements/LinkElement";
import type { SlateElements, Text, TextAlignment } from "./types";
import { useTransition } from "remix";
import { HoverToolbar } from "./toolbar/HoverToolbar";
import classNames from "classnames";
import { withLinks } from "~/lib/editor/withLinks";

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
  onChange?: (value: Descendant[]) => void;
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

export function SlateEditor({ isReadonly, value, onChange }: EditorProps) {
  const { state, type } = useTransition();
  const renderElement = React.useCallback((props) => <Element {...props} />, []);
  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);
  const editor = React.useMemo(
    () => withLinks(withChecklists(withShortcuts(withHistory(withReact(createEditor()))))),
    [],
  );

  function handleChange(value: Descendant[]) {
    onChange?.(value);
  }

  if (state !== "idle" && type === "normalLoad") {
    return null;
  }

  return (
    <div
      className="mt-1 px-3"
      style={{ height: "calc(100vh - 4rem)", overflowY: "auto", width: "calc(100vw - 320px)" }}
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

  return <span {...attributes}>{children}</span>;
}

function Element({ attributes, children, element, ...rest }: RenderElementProps) {
  const textAlign = "align" in element ? (element.align as TextAlignment) : null;

  switch (element.type) {
    case "block-quote":
      return (
        <blockquote {...attributes} className="border-l-[3px] dark:border-[#3f3f3f] pl-2">
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return (
        <h1 {...attributes} className={classNames("text-3xl font-semibold", textAlign)}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 {...attributes} className={classNames("text-2xl font-semibold", textAlign)}>
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3 {...attributes} className={classNames("text-xl font-semibold", textAlign)}>
          {children}
        </h3>
      );
    case "list-item":
      return (
        <li {...attributes} data-list-item="true">
          {children}
        </li>
      );
    case "link":
      return <LinkElement {...{ attributes, children, element }} />;
    case "check-list-item":
      return <CheckListItemElement {...{ children, attributes, element, ...rest }} />;
    default:
      return (
        <p className={classNames(textAlign)} {...attributes}>
          {children}
        </p>
      );
  }
}
