import * as React from "react";
import * as RToolbar from "@radix-ui/react-toolbar";
import * as Portal from "@radix-ui/react-portal";
import { Range, Editor } from "slate";
import { useFocused, useSlate } from "slate-react";
import { LinkButton, MarkButton } from "./Toolbar";
import {
  TypeItalic,
  TypeStrikethrough,
  TypeUnderline,
  TypeBold,
  Link,
  Code,
} from "react-bootstrap-icons";

export function HoverToolbar() {
  const ref = React.useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const inFocus = useFocused();

  React.useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el || !selection || !inFocus) {
      return;
    }

    if (Range.isCollapsed(selection) || Editor.string(editor, selection) === "") {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);

    if (!domRange) return;

    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight - 10}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal.Root>
      <RToolbar.Root
        onMouseDown={(e) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault();
        }}
        ref={ref}
        className="flex gap-1 mb-5 mt-2 absolute z-50 -top-96 -left-96 bg-gray-300 dark:bg-dark-6 p-1 rounded-md opacity-0"
      >
        <RToolbar.ToolbarToggleGroup
          className="flex gap-1"
          type="multiple"
          aria-label="Text formatting"
        >
          <MarkButton format="bold" icon={<TypeBold aria-label="bold" />} />
          <MarkButton format="italic" icon={<TypeItalic aria-label="italic" />} />
          <MarkButton format="underline" icon={<TypeUnderline aria-label="underline" />} />
          <MarkButton
            format="strikethrough"
            icon={<TypeStrikethrough aria-label="strikethrough" />}
          />
          <MarkButton format="inline-code" icon={<Code aria-label="inline-code" />} />
          <LinkButton icon={<Link aria-label="link" />} />
        </RToolbar.ToolbarToggleGroup>
      </RToolbar.Root>
    </Portal.Root>
  );
}
