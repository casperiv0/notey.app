import { combineReducers } from "redux";
import NoteReducer from "./noteReducers";
import AuthReducer from "./authReducer";

export default combineReducers({
  auth: AuthReducer,
  notes: NoteReducer,
});
