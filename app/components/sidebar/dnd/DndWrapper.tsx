import * as React from "react";
import type { Category, Note } from ".prisma/client";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import { CategoryItem } from "../Category";
import { useFetcher, useLocation } from "remix";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

interface Props {
  categories: (Category & { notes: Note[] })[];
}

const MIN_Y_DRAG_DISTANCE = 10;

export const DndWrapper = ({ categories: data }: Props) => {
  const [categories, setCategories] = React.useState(sortCategories(data));
  const fetcher = useFetcher();
  const { pathname } = useLocation();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: { y: MIN_Y_DRAG_DISTANCE } },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: { y: MIN_Y_DRAG_DISTANCE } },
  });

  function handleDragEnd({ over, active }: DragEndEvent) {
    if (!over) return;

    const copy = [...categories];

    /** this is the index of where the "dragging item" came of */
    const fromIdx = copy.findIndex(({ id }) => active.data.current?.id === id);
    /** this is the index where the "dragging item" want to go to */
    const toIndex = copy.findIndex(({ id }) => over?.data.current?.id === id);

    /**
     * example:
     *
     * active: { a: true } === fromIdx
     * over: { b: true } === toIndex
     */
    const copiedFrom = copy[fromIdx]; // `active: { a: true }`

    copy[fromIdx] = over?.data.current as any; // `over: { b: true }`
    copy[toIndex] = copiedFrom; // `active: { a: true }`

    handleCategoryUpdate(
      {
        id: copiedFrom.id,
        position: toIndex,
      },
      {
        id: over?.data.current?.id,
        position: fromIdx,
      },
    );

    setCategories(copy);
  }

  async function handleCategoryUpdate(x, y) {
    const data = new FormData();
    const url = `/api/category/position?next=${pathname}`;

    data.append("x", JSON.stringify(x));
    data.append("y", JSON.stringify(y));

    fetcher.submit(data, { method: "patch", action: url });
  }

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} sensors={sensors} onDragEnd={handleDragEnd}>
      {categories.map((category) => (
        <Droppable
          disabled={category.id === "no_category"}
          data={category}
          key={category.id}
          id={category.id}
        >
          <Draggable
            disabled={category.id === "no_category"}
            data={category}
            id={`draggable-${category.id}`}
          >
            <CategoryItem category={category} />
          </Draggable>
        </Droppable>
      ))}
    </DndContext>
  );
};

/**
 * sort the categories and notes by their position
 */
function sortCategories(
  categories: (Category & { notes: Note[] })[],
): (Category & { notes: Note[] })[] {
  return categories.sort(sort).map((category) => ({
    ...category,
    notes: category.notes.sort(sort),
  }));
}

function sort<T extends Category | Note = Category>(a: T, b: T) {
  const high = 999;

  return (a.position ?? high) - (b.position ?? high);
}
