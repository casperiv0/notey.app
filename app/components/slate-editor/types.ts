import type { Descendant } from "slate";

export interface Text {
  text: string;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  italic?: boolean;
  "inline-code"?: boolean;
}

export interface ParagraphElement {
  type: "paragraph";
  align?: TextAlignment;
  children: Descendant[];
}

export interface HeadingOneElement {
  type: "heading-one";
  align?: TextAlignment;
  children: Text[];
}

export interface HeadingTwoElement {
  type: "heading-two";
  align?: TextAlignment;
  children: Text[];
}

export interface HeadingThreeElement {
  type: "heading-three";
  align?: TextAlignment;
  children: Text[];
}

export interface BlockquoteElement {
  type: "block-quote";
  align?: TextAlignment;
  children: Text[];
}

export interface ListItemElement {
  type: "list-item";
  children: Text[];
}

export interface BulletItemElement {
  type: "bulleted-list";
  children: Text[];
}

export interface CheckListItemElement {
  type: "check-list-item";
  checked?: boolean;
  children: Text[];
}

export interface LinkElement {
  type: "link";
  url: string;
  children: Text[];
}

export interface DelimiterElement {
  type: "delimiter";
}

export type SlateElements =
  | ParagraphElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | BlockquoteElement
  | ListItemElement
  | BulletItemElement
  | CheckListItemElement
  | LinkElement
  | DelimiterElement;

export type TextBlocks =
  | ParagraphElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | BlockquoteElement;

export type TextAlignment = "text-left" | "text-right" | "text-center" | "text-justify";
export type SlateFormat = SlateElements["type"] | TextAlignment;
