import React from "react";
import App from "next/app";
import "../css/index.css";

import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux/store/store";

const MyApp = (props) => {
  const { Component, pageProps, store } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default withRedux(initStore)(MyApp);
