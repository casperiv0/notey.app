import { handleRequest, isSuccess } from "../utils/functions";
import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERR,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  SET_MESSAGE,
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
      dispatch({
        type: SET_MESSAGE,
        message: `Successfully created category with name: ${data.name}`,
      });
    } else {
      dispatch({ type: CREATE_CATEGORY_ERR, error: res.data.error });
    }
  });
};

export const updateCategory = (id) => (dispatch) => {
  handleRequest(`/categories/${id}`, "PUT").then((res) => {
    if (isSuccess(res)) {
      dispatch({ type: UPDATE_CATEGORY, categories: res.data.categories });
      dispatch({
        type: SET_MESSAGE,
        message: `Successfully updated`,
      });
    } else {
      dispatch({ type: CREATE_CATEGORY_ERR, error: res.data.error });
    }
  });
};

export const deleteCategory = (id) => (dispatch) => {
  handleRequest(`/categories/${id}`, "DELETE").then((res) => {
    if (isSuccess(res)) {
      dispatch({ type: DELETE_CATEGORY, categories: res.data.categories });
      dispatch({
        type: SET_MESSAGE,
        message: `Successfully deleted category`,
      });
    }
  });
};
