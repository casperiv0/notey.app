import { combineReducers } from "redux";
import authReducer from "./authReducer";
import noteReducer from "./noteReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  auth: authReducer,
  note: noteReducer,
  categories: categoryReducer,
});
