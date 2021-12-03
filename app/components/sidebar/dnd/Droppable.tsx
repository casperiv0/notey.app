import type * as React from "react";
import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";

interface Props extends UseDroppableArguments {
  children: React.ReactNode;
}

export function Droppable(props: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: props.data,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  if (props.disabled) {
    return <>{props.children}</>;
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
