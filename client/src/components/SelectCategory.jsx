import React from "react";
import { SelectCategoryStyle } from "../styles/Category";

function SelectCategory({ className, id, categoryId, categories, setCategoryId }) {
  return (
    <SelectCategoryStyle
      id={id}
      className={className}
      value={categoryId}
      onChange={(e) => setCategoryId(e.target.value)}
    >
      <option value="no_category">No category</option>
      {categories &&
        categories.map((category, i) => {
          return (
            <option key={i} value={category._id}>
              {category.name}
            </option>
          );
        })}
    </SelectCategoryStyle>
  );
}

export default SelectCategory;
