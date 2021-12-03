import type * as React from "react";
import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";

interface Props extends UseDraggableArguments {
  children: React.ReactNode;
}

export function Draggable(props: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: props.data,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  if (props.disabled) {
    return <>{props.children}</>;
  }

  return (
    <div className="cursor-move" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}
