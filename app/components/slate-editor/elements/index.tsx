import type { TextAlignment } from "../types";
import type { RenderElementProps } from "slate-react";
import { CheckListItemElement } from "./ChecklistItem";
import { LinkElement } from "./LinkElement";
import classNames from "classnames";

export function EditorElement({ attributes, children, element, ...rest }: RenderElementProps) {
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
