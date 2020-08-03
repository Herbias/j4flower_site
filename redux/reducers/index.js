import NavigationReducer from "./NavigationReducer";
import UserReducer from "./UserReducer";
import QuickBuildReducer from "./QuickBuildReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  NavigationReducer,
  UserReducer,
  QuickBuildReducer,
});

export default rootReducer;
