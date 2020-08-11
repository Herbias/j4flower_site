import React, { useEffect } from "react";
import App from "next/app";
import "../css/index.css";

import { wrapper } from "../redux/store/store";

import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT);

const MyApp = (props) => {
  const { Component, pageProps, store } = props;

  return <Component {...pageProps} />;
};

//export default withRedux(initStore)(MyApp);
export default wrapper.withRedux(MyApp);
