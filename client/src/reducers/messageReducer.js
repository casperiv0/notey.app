import {
  ADD_MESSAGE,
  GET_MESSAGES,
  REMOVE_MESSAGE,
} from "../utils/types";

const initState = {
  messages: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case GET_MESSAGES:
      return {
        ...state,
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((_msg, i) => i !== action.idx),
      };
    default:
      return {
        ...state,
      };
  }
}
