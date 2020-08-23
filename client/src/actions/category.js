import { handleRequest, isSuccess } from "../utils/functions";
import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERR,
  DELETE_CATEGORY,
} from "../utils/types";

export const getCategories = () => (dispatch) => {
  handleRequest("/categories", "GET")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: GET_CATEGORIES, categories: res.data.categories });
      }
    })
    .catch((e) => console.log(e));
};

export const createCategory = (data) => (dispatch) => {
  handleRequest("/categories", "POST", data).then((res) => {
    if (isSuccess(res)) {
      dispatch({ type: CREATE_CATEGORY, categories: res.data.categories });
    } else {
      dispatch({ type: CREATE_CATEGORY_ERR, error: res.data.error });
    }
  });
};

export const deleteCategory = (id) => (dispatch) => {
  handleRequest(`/categories/${id}`, "DELETE").then((res) => {
    if (isSuccess(res)) {
      dispatch({ type: DELETE_CATEGORY, categories: res.data.categories });
    }
  });
};
