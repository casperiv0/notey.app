import State from "types/State";
import { Authenticate, SetLoading } from "../types";

type Actions = Authenticate | SetLoading;
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
    case "SET_AUTH_LOADING": {
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
