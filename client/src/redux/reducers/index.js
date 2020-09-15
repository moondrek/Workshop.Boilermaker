import { combineReducers } from "redux";
import wealthReducer from "./wealthReducer";
import playerReducer from "./playerReducer";

export default combineReducers({
  wealth: wealthReducer,
  player: playerReducer,
});
