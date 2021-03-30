import Category from "types/Category";
import State from "types/State";
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, SET_CATEGORY_LOADING } from "../types";

type Actions =
  | {
      type: typeof GET_CATEGORIES;
      categories: Category[];
    }
  | {
      type: typeof SET_CATEGORY_LOADING;
      loading: boolean;
    }
  | {
      type: typeof CREATE_CATEGORY;
      categories: Category[];
    }
  | {
      type: typeof DELETE_CATEGORY;
      categories: Category[];
    };

const initState: State["categories"] = {
  categories: [],
  loading: false,
};

export default function CategoryReducer(state = initState, action: Actions): State["categories"] {
  switch (action.type) {
    case "GET_CATEGORIES": {
      return {
        ...state,
        categories: action.categories,
      };
    }
    case "SET_CATEGORY_LOADING": {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case "CREATE_CATEGORY": {
      return {
        ...state,
        categories: action.categories,
      };
    }
    case "DELETE_CATEGORY": {
      return {
        ...state,
        categories: action.categories,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
