import React from "react";
import App from "next/app";
import "../css/index.css";

import {wrapper} from "../redux/store/store";


const MyApp = (props) => {
  const { Component, pageProps, store } = props;
  return (
    <Component {...pageProps} />
  );
};

//export default withRedux(initStore)(MyApp);
export default wrapper.withRedux(MyApp)
