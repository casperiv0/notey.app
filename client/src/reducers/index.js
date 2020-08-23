import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import noteReducer from "./noteReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  auth: authReducer,
  note: noteReducer,
  message: messageReducer,
  categories: categoryReducer,
});
