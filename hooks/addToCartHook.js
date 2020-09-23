import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import { useSelector, useDispatch } from "react-redux";
import { ToUpdate } from "../redux/actions/CartAction";

export const useAddToCartHook = (data) => {
  const cart = useSelector((state) => state.CartReducer);
  const user = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch;

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (data) setLoading(true);
    // add();
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      data["user"] = user.isLogin
        ? { id: user.data.userid, type: "registered" }
        : { id: localStorage.getItem("guestId"), type: "guest" };
      data["quantity"] = cart.quantity;
      data["image"] = null;
      fetch(`http://localhost:3001/add/cart`, {
        method: "POST",
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
          setSuccess(res);
        });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
    }
  }, [isSuccess]);

  // const add = async () => {
  //   if (cart.product.name == data.name) {
  //     sendRequest(cart.product).then((data) => setSuccess(true));
  //     setLoading(false);
  //   }
  // };

  // const sendRequest = (data) => {
  //   data["user"] = user.isLogin
  //     ? { id: user.data.userid, type: "registered" }
  //     : { id: localStorage.getItem("guestId"), type: "guest" };
  //   data["quantity"] = cart.quantity;

  //   console.log(data);

  //   return new Promise((resolve, err) => {
  //     fetch(`http://localhost:3001/add/cart`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         data,
  //       }),
  //     })
  //       .then((res) => {
  //         try {
  //           if (res.status == 200) {
  //             return res.json();
  //           }
  //         } catch (err) {
  //           console.warn(err);
  //         }
  //       })
  //       .then((res) => {
  //         resolve(res);
  //       });
  //   });
  // };

  // if (isLoading && cart.product.name == data.name) {
  //   sendRequest(cart.product).then((data) => {
  //     setSuccess(true);
  //     setLoading(false);
  //   });
  // }

  return [isLoading, isSuccess];
};
