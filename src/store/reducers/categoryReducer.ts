import Category from "types/Category";
import State from "types/State";
import { GET_CATEGORIES, SET_LOADING } from "../types";

type Actions =
  | {
      type: typeof GET_CATEGORIES;
      categories: Category[];
    }
  | {
      type: typeof SET_LOADING;
      loading: boolean;
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
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.loading,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
