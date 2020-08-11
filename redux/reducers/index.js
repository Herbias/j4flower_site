import NavigationReducer from "./NavigationReducer";
import UserReducer from "./UserReducer";
import QuickBuildReducer from "./QuickBuildReducer";
import CartReducer from "./CartReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  NavigationReducer,
  UserReducer,
  QuickBuildReducer,
  CartReducer,
});

export default rootReducer;
