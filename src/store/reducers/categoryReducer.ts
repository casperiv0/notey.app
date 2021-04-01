import State from "types/State";
import { SetLoading, UpdateCategoriesState } from "../types";

type Actions = UpdateCategoriesState | SetLoading;

const initState: State["categories"] = {
  categories: [],
  loading: false,
};

export default function CategoryReducer(state = initState, action: Actions): State["categories"] {
  switch (action.type) {
    case "UPDATE_CATEGORY_BY_ID":
    case "CREATE_CATEGORY":
    case "DELETE_CATEGORY":
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
    default: {
      return {
        ...state,
      };
    }
  }
}
