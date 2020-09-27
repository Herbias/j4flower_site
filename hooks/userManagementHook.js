import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

import { DoLogin } from "../redux/actions/UserAction";

const ENDPOINT = "https://api.appygo.io";
const socket = socketIOClient(ENDPOINT);

export const useUserManagementHook = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer);

  const [deviceData, setDeviceData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("isLogin"))
      localStorage.setItem("isLogin", false);

    if (localStorage.getItem("user"))
      dispatch(DoLogin(true, JSON.parse(localStorage.getItem("user"))));

    if (!localStorage.getItem("guestId"))
      setDeviceData({
        os: window.navigator.oscpu,
        browser: window.navigator.userAgent,
      });
  }, []);

  useEffect(() => {
    if (deviceData) socket.emit("visit", deviceData);
  }, [deviceData]);

  useEffect(() => {
    if (user.isLogin) {
      localStorage.setItem("isLogin", true);
      localStorage.setItem("user", JSON.stringify(user.data));
    }
    if (!user.isLogin && !localStorage.getItem("isLogin")) {
      //   localStorage.setItem("isLogin", false);
      //   localStorage.removeItem("user");
    }
  }, [user.isLogin]);

  useEffect(() => {
    socket.on("visitor", (data) => {
      if (!localStorage.getItem("guestId"))
        localStorage.setItem("guestId", JSON.stringify(data));
    });
  });
};
