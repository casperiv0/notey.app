import { ModalIds } from "@lib/constants";
import { handleRequest, isSuccess, RequestData } from "@lib/fetch";
import { closeModal } from "@lib/utils";
import { toast } from "react-toastify";
import { Dis, GetAllNotes, UpdateCategoriesState } from "../types";

export const getCategories = (cookie?: string) => async (dispatch: Dis<UpdateCategoriesState>) => {
  try {
    const res = await handleRequest("/categories", "GET", {
      cookie,
    });

    if (isSuccess(res)) {
      dispatch({
        type: "GET_CATEGORIES",
        categories: res.data.categories,
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const createCategory = (data: RequestData) => async (
  dispatch: Dis<UpdateCategoriesState>,
): Promise<boolean> => {
  dispatch({ type: "SET_CATEGORY_LOADING", loading: true });

  try {
    const res = await handleRequest("/categories", "POST", data);

    if (isSuccess(res)) {
      dispatch({
        type: "CREATE_CATEGORY",
        categories: res.data.categories,
      });

      toast.success(`Successfully created category with name: ${data.name}`);
      return true;
    } else {
      dispatch({ type: "SET_CATEGORY_LOADING", loading: false });
      toast.error(res.data.error);
      return false;
    }
  } catch (e) {
    dispatch({ type: "SET_CATEGORY_LOADING", loading: false });
    toast.error(e?.response?.data?.error);
    return false;
  }
};

export const deleteCategory = (id: string) => async (
  dispatch: Dis<UpdateCategoriesState | GetAllNotes>,
) => {
  dispatch({ type: "SET_CATEGORY_LOADING", loading: true });

  try {
    const res = await handleRequest(`/categories/${id}`, "DELETE");

    if (isSuccess(res)) {
      dispatch({
        type: "DELETE_CATEGORY",
        categories: res.data.categories,
      });

      dispatch({
        type: "GET_NOTES",
        notes: res.data.notes,
      });

      toast.success("Successfully deleted category");
    } else {
      dispatch({ type: "SET_CATEGORY_LOADING", loading: false });
      toast.error(res.data.error);
    }
  } catch (e) {
    dispatch({ type: "SET_CATEGORY_LOADING", loading: false });
    toast.error(e?.response?.data?.error);
  }
};

export const updateCategoryById = (id: string, data: RequestData, notify: boolean = true) => async (
  dispatch: Dis<UpdateCategoriesState>,
) => {
  dispatch({ type: "SET_CATEGORY_LOADING", loading: true });

  try {
    const res = await handleRequest(`/categories/${id}`, "PUT", data);

    if (isSuccess(res)) {
      dispatch({
        type: "UPDATE_CATEGORY_BY_ID",
        categories: res.data.categories,
      });

      closeModal(ModalIds.EditCategory);
      notify && toast.success("Successfully updated category");
    } else {
      dispatch({ type: "SET_CATEGORY_LOADING", loading: false });
      toast.error(res.data.error);
    }
  } catch (e) {
    dispatch({ type: "SET_CATEGORY_LOADING", loading: false });
    toast.error(e?.response?.data?.error);
  }
};
