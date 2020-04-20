import { createStore, applyMiddleware, combineReducers } from "redux";

import rootReducer from "../reducers/index";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const initStore = () => {
  return createStore(rootReducer, bindMiddleware([]));
};
