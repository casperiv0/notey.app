import { combineReducers } from "redux";
import NoteReducer from "./noteReducers";
import AuthReducer from "./authReducer";
import CategoryReducer from "./categoryReducer";
import State from "types/State";

export default combineReducers<State>({
  auth: AuthReducer,
  notes: NoteReducer,
  categories: CategoryReducer,
});
