import NavigationReducer from "./NavigationReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ NavigationReducer, UserReducer });

export default rootReducer;
