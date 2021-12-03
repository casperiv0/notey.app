import * as React from "react";
import type { Category, Note } from ".prisma/client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import { CategoryItem } from "../Category";

interface Props {
  categories: (Category & { notes: Note[] })[];
}

export const DndWrapper = ({ categories: data }: Props) => {
  const [categories, setCategories] = React.useState(sortCategories(data));

  function handleDragEnd({ over, active }: DragEndEvent) {
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

    setCategories(copy);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
  return (a.position ?? -1) - (b.position ?? -1);
}

/* eslint-disable */
{
  /* <ul role="list">
{categories.map((category) => {
  return <CategoryItem key={category.id} category={category} />;
})}

{noCategoryNotes.length <= 0 ? null : (
  <CategoryItem
    category={{
      userId: "null",
      id: "no_category",
      name: "No category",
      notes: noCategoryNotes,
      createdAt: new Date(""),
      folded: false,
    }}
  />
)}
</ul> */
}
