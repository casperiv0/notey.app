import type { SlateElements, TextAlignment } from "../types";
import type { RenderElementProps } from "slate-react";
import { CheckListItemElement } from "./ChecklistItem";
import { LinkElement } from "./LinkElement";
import classNames from "classnames";

type ComponentItem = (props: RenderElementProps & { element: SlateElements }) => JSX.Element;

const components: Record<string, ComponentItem> = {
  "block-quote": ({ children, attributes, element }) => (
    <blockquote
      {...attributes}
      className={classNames(
        "border-l-[3px] dark:border-[#3f3f3f] pl-2",
        "align" in element ? element.align : null,
      )}
    >
      {children}
    </blockquote>
  ),
  "bulleted-list": ({ children, attributes }) => <ul {...attributes}>{children}</ul>,
  "heading-one": ({ children, attributes, element }) => (
    <h1
      {...attributes}
      className={classNames("text-3xl font-semibold", "align" in element ? element.align : null)}
    >
      {children}
    </h1>
  ),
  "heading-two": ({ children, attributes, element }) => (
    <h2
      {...attributes}
      className={classNames("text-2xl font-semibold", "align" in element ? element.align : null)}
    >
      {children}
    </h2>
  ),
  "heading-three": ({ children, attributes, element }) => (
    <h3
      {...attributes}
      className={classNames("text-xl font-semibold", "align" in element ? element.align : null)}
    >
      {children}
    </h3>
  ),
  "list-item": ({ children, attributes }) => (
    <li {...attributes} data-list-item="true">
      {children}
    </li>
  ),
  "check-list-item": ({ children, attributes, element }) => (
    <CheckListItemElement {...({ children, attributes, element } as any)} />
  ),
  link: ({ children, attributes, element }) => (
    <LinkElement {...{ attributes, children, element }} />
  ),
  delimiter: ({ attributes, children }) => (
    <span {...attributes}>
      {children}
      <hr className="w-full select-none border-t-2 rounded-md dark:border-[#3f3f3f]" />
    </span>
  ),
};

export function EditorElement({ attributes, children, element }: RenderElementProps) {
  const textAlign = "align" in element ? (element.align as TextAlignment) : null;
  const component = components[element.type] as ComponentItem | undefined;

  if (component) {
    return component({ children, attributes, element });
  }

  return (
    <p className={classNames(textAlign)} {...attributes}>
      {children}
    </p>
  );
}
