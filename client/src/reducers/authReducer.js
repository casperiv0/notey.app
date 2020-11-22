import {
  AUTHENTICATE,
  AUTH_ERR,
  SET_LOADING,
  SET_PIN_CODE,
} from "../utils/types";

const initState = {
  user: {},
  error: null,
  isAuth: false,
  loading: false,
  closeAble: false,
};

export default function authReducer(state = initState, action) {
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
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_PIN_CODE:
      return {
        ...state,
        closeAble: action.closeAble,
      };
    default:
      return {
        ...state,
        closeAble: false,
      };
  }
}
