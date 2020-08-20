import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import noteReducer from "./noteReducer";

export default combineReducers({
  auth: authReducer,
  note: noteReducer,
  message: messageReducer,
});
