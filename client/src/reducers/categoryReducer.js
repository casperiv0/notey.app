import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERR,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  SET_LOADING,
} from "../utils/types";

const initState = {
  categories: [],
  error: null,
  loading: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: action.categories,
        error: null,
      };
    case CREATE_CATEGORY_ERR:
      return {
        ...state,
        error: action.error,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: action.categories,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return {
        ...state,
      };
  }
}
