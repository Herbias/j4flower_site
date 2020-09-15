import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useSelector } from "react-redux";

export const useGetCartItem = () => {
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  const user = useSelector((state) => state.UserReducer);
  const cart = useSelector((state) => state.CartReducer.product);

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetch(`http://localhost:3001/get/cart/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          user.isLogin
            ? { userId: user.data.userid, userType: "registered" }
            : { userId: localStorage.getItem("guestId"), userType: "guest" }
        ),
      })
        .then((res) => {
          try {
            return res.json();
          } catch (err) {
            console.warn(e);
          }
        })
        .then((res) => {
          setLoading(false);
          setItems(res);
        })
        .catch((err) => {
          console.log(err);
          setItems(null);
        });
    }
  }, [isLoading]);

  useEffect(() => {
    if (items) setLoading(false);
  }, [items]);

  return [isLoading, items];
};
