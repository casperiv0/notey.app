import { RenderElementProps } from "slate-react";

interface Props extends RenderElementProps {
  children: React.ReactNode;
}

export function LinkElement({ children, element, attributes }: Props) {
  const url = "url" in element ? element.url : null;

  if (!url) {
    return null;
  }

  return (
    <a {...attributes} href={url} target="_blank" rel="noreferrer noopener" className="underline">
      {children}
    </a>
  );
}
