import { combineReducers } from "redux";
import NoteReducer from "./noteReducers";
import AuthReducer from "./authReducer";
import CategoryReducer from "./categoryReducer";

export default combineReducers({
  auth: AuthReducer,
  notes: NoteReducer,
  categories: CategoryReducer,
});
