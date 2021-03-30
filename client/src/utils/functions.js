
export const changeFoldedState = (id) => {
  const node = document.getElementById(`category-${id}`);

  if (!node) return;

  if (node.classList.contains("folded")) {
    node.classList.remove("folded");
  } else {
    node.classList.add("folded");
  }
};
