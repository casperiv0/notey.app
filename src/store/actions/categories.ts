import { toast } from "react-hot-toast";
import { ModalIds } from "lib/constants";
import { getErrorFromResponse, handleRequest, isSuccess, RequestData } from "lib/fetch";
import { closeModal } from "lib/utils";

export async function getCategories(cookie?: string) {
  try {
    const res = await handleRequest("/categories", "GET", {
      cookie,
    });

    if (isSuccess(res)) {
      return {
        categories: res.data.categories,
      };
    }

    return null;
  } catch (e) {
    return { error: getErrorFromResponse(e) };
  }
}

export async function createCategory(data: RequestData) {
  try {
    const res = await handleRequest("/categories", "POST", data);

    if (isSuccess(res)) {
      return {
        categories: res.data.categories,
      };
    }

    toast.error(res.data.error);
    return null;
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    return null;
  }
}

export async function deleteCategory(id: string) {
  try {
    const res = await handleRequest(`/categories/${id}`, "DELETE");

    if (isSuccess(res)) {
      return {
        categories: res.data.categories,
        notes: res.data.notes,
      };
    }

    toast.error(res.data.error);
    return null;
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    return null;
  }
}

export async function updateCategoryById(id: string, data: RequestData, notify = true) {
  try {
    const res = await handleRequest(`/categories/${id}`, "PUT", data);

    if (isSuccess(res)) {
      closeModal(ModalIds.EditCategory);
      notify && toast.success("Successfully updated category");

      return {
        categories: res.data.categories,
      };
    }

    toast.error(res.data.error);
    return null;
  } catch (e) {
    toast.error(getErrorFromResponse(e));
    return null;
  }
}
