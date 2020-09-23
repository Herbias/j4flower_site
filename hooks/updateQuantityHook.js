import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import { useSelector, useDispatch } from "react-redux";

export const useUpdateQuantity = (data) => {
  const cart = useSelector((state) => state.CartReducer);
  const user = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch;

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (data) setLoading(true);
  }, [data]);

  useEffect(() => {
    const abortController = new AbortController();
    if (isLoading) {
      data["user"] = user.isLogin
        ? { id: user.data.userid, type: "registered" }
        : { id: localStorage.getItem("guestId"), type: "guest" };
      data["quantity"] = cart.quantity;
      fetch(`http://localhost:3001/update/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
        }),
        signal: abortController.signal,
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
        })
        .catch((e) => {
          return;
        });
    }

    return () => abortController.abort();
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) setLoading(false);
  }, [isSuccess]);

  return [isLoading, isSuccess];
};
