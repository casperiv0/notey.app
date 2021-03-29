import State from "types/State";
import { AUTHENTICATE, SET_LOADING } from "../types";

type Actions =
  | {
      type: typeof AUTHENTICATE;
      isAuth: boolean;
      user: any;
    }
  | {
      type: typeof SET_LOADING;
      loading: boolean;
    };

const initState: State["auth"] = {
  loading: false,
  isAuth: false,
  user: null,
};

export default function AuthReducer(state = initState, action: Actions): State["auth"] {
  switch (action.type) {
    case "AUTHENTICATE": {
      return {
        ...state,
        user: action.user,
        isAuth: action.isAuth,
        loading: false,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.loading,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
