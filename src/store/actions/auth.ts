import { toast } from "react-toastify";
import { handleRequest, isSuccess, RequestData } from "@lib/fetch";
import { AUTHENTICATE, SET_LOADING } from "../types";
import { NO_ERROR } from "@lib/constants";

export const authenticate = (data: RequestData) => async (dispatch): Promise<boolean> => {
  dispatch({ type: SET_LOADING, loading: true });

  try {
    const res = await handleRequest("/auth/login", "POST", data);

    console.log(res);

    if (isSuccess(res)) {
      dispatch({
        type: AUTHENTICATE,
        user: res.data.user,
        isAuth: true,
      });

      return true;
    } else {
      toast.error(res.data.error);
      return false;
    }
  } catch (e) {
    toast.error(e?.response.data?.error ?? NO_ERROR);
    dispatch({ type: SET_LOADING, loading: false });
    return false;
  }
};
