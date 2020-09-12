import { ADD_MESSAGE, GET_MESSAGES, REMOVE_MESSAGE } from "../utils/types";

export const addMessage = (content) => (dispatch) => {
  return dispatch({ type: ADD_MESSAGE, message: content });
};

export const getMessages = () => (dispatch) => {
  return dispatch({ type: GET_MESSAGES });
};

export const removeMessage = (idx) => (dispatch) => {
  dispatch({ type: REMOVE_MESSAGE, idx: idx });
};
