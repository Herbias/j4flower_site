import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import { useSelector, useDispatch } from "react-redux";

export const useDeleteFromCartHook = (data) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(null);

  const user = useSelector((state) => state.UserReducer);

  useEffect(() => {
    if (data) setLoading(true);
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      data["user"] = user.isLogin
        ? { id: user.data.userid, type: "registered" }
        : { id: localStorage.getItem("guestId"), type: "guest" };
      fetch(`http://api.appygo.io/delete/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          try {
            if (res.status == 200) {
              return res.json();
            }
          } catch (err) {
            console.warn(err);
          }
        })
        .then((res) => {
          setSuccess(res);
        });
    }
  }, [isLoading]);

  useEffect(() => {
    setLoading(false);
  }, [isSuccess]);

  return [isLoading, isSuccess];
};
