import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import { useSelector, useDispatch } from "react-redux";
import { ToUpdate } from "../redux/actions/CartAction";

export const useAddToCartHook = (data) => {
  const cart = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch;

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const add = async () => {
    if (isLoading && cart.product.name == data.name) {
      for (let i = 0; i < cart.quantity; i++) sendRequest(cart.product);
      setLoading(false);
    }
  };

  const sendRequest = (data) => {
    data["user"] = { id: localStorage.getItem("guestId"), type: "guest" };
    return new Promise((resolve, err) => {
      fetch(`http://localhost:3001/add/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
        }),
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
          resolve(res);
        });
    });
  };

  useEffect(() => {
    setLoading(true);
    add();
  }, [cart]);

  return [isLoading, isSuccess];
};
