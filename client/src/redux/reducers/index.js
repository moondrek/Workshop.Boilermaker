import { combineReducers } from "redux";
import wealthReducer from "./wealthReducer";

export default combineReducers({
  wealth: wealthReducer,
});
