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

  if (isLoading) {
    fetch(
      `http://localhost:3001/get/cart/items?userId=${
        user.isLogin
          ? user.id + `&userType=registerd`
          : localStorage.getItem("guestId") + `&userType=guest`
      }`
    )
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

  useEffect(() => {
    setLoading(true);
  }, [cart]);

  useEffect(() => {
    console.log("Component did update");
  }, [isLoading]);

  return [isLoading, items];
};
