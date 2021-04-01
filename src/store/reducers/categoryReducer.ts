import Category from "types/Category";
import State from "types/State";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  SET_CATEGORY_LOADING,
  UPDATE_CATEGORY_BY_ID,
} from "../types";

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
    }
  | {
      type: typeof UPDATE_CATEGORY_BY_ID;
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
        loading: false,
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
        loading: false,
      };
    }
    case "DELETE_CATEGORY": {
      return {
        ...state,
        categories: action.categories,
        loading: false,
      };
    }
    case "UPDATE_CATEGORY_BY_ID": {
      return {
        ...state,
        categories: action.categories,
        loading: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
