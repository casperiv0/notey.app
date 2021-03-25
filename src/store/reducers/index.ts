import { combineReducers } from "redux";

const AuthReducers = (state) => {
  switch ("type") {
    case "type": {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default combineReducers({
  auth: AuthReducers,
});
