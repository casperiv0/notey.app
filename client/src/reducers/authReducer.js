import { AUTHENTICATE, AUTH_ERR } from "../utils/types";

const initState = {
  user: {},
  error: null,
  isAuth: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        user: action.user,
        isAuth: action.isAuth,
        error: null,
      };
    case AUTH_ERR:
      return {
        ...state,
        error: action.error,
        isAuth: false,
      };
    default:
      return {
        ...state,
      };
  }
}
