import { handleRequest, isSuccess } from "../utils/functions";
import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_NOTES,
  SET_LOADING,
} from "../utils/types";
import { toast } from "react-toastify";

export const getCategories = () => (dispatch) => {
  handleRequest("/categories", "GET")
    .then((res) => {
      if (isSuccess(res)) {
        dispatch({ type: GET_CATEGORIES, categories: res.data.categories });
      }
    })
    .catch((e) => console.error(e));
};

export const createCategory = (data) => async (dispatch) => {
  dispatch({ type: SET_LOADING, loading: true });

  return handleRequest("/categories", "POST", data).then((res) => {
    if (isSuccess(res)) {
      // return all categories
      dispatch({ type: CREATE_CATEGORY, categories: res.data.categories });

      // set success message
      toast.success(`Successfully created category with name: ${data.name}`);

      // disable loading
      dispatch({ type: SET_LOADING, loading: false });

      return true;
    } else {
      dispatch({ type: SET_LOADING, loading: false });
      toast.error(res.data.error);
      return false;
    }
  });
};

export const deleteCategory = (id) => (dispatch) => {
  handleRequest(`/categories/${id}`, "DELETE").then((res) => {
    if (isSuccess(res)) {
      dispatch({ type: DELETE_CATEGORY, categories: res.data.categories });
      dispatch({ type: GET_NOTES, notes: res.data.notes });

      toast.success("Successfully deleted category");
    }
  });
};
