import { CLEAR_MESSAGE } from "../utils/types";

export const clearMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
};
