import * as React from "react";
import { SelectCategoryStyle } from "@styles/Category";
import Category from "types/Category";

interface Props {
  id: string;
  value: string;
  className?: string;
  categories: Category[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectCategory: React.FC<Props> = ({ categories, ...rest }) => {
  return (
    <SelectCategoryStyle {...rest}>
      <option value="no_category">No category</option>
      {categories?.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </SelectCategoryStyle>
  );
};

export default SelectCategory;
