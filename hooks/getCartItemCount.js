import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useSelector } from "react-redux";

export const useGetCartItemCount = () => {
  const [isLoading, setLoading] = useState(false);
  const [noOfItems, setNoOfItems] = useState(null);
  const user = useSelector((state) => state.UserReducer);
  const cart = useSelector((state) => state.CartReducer);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (isLoading) {
    fetch(
      `http://localhost:3001/get/cart/itemscount?userId=${
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
        if (noOfItems != res) {
          setLoading(false);
          setNoOfItems(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
  }, [cart.toUpdate]);

  useEffect(() => {
    console.log("Component did update");
  }, [isLoading]);

  return [isLoading, noOfItems];
};
