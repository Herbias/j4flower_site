import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useSelector } from "react-redux";

export const useGetCartItemCount = (isLogin) => {
  const [isLoading, setLoading] = useState(false);
  const [noOfItems, setNoOfItems] = useState(null);
  const user = useSelector((state) => state.UserReducer);

  useEffect(() => {
    setLoading(true);
    fetch(`http://api.appygo.io/get/cart/itemscount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(
        user.isLogin
          ? { userId: user.data.userid, userType: "registered" }
          : {
              userId: localStorage.getItem("guestId"),
              userType: "guest",
            }
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
        setNoOfItems(res);
      })
      .catch((err) => {
        // console.log(err);
        setNoOfItems(false);
      });
  }, [isLogin]);

  useEffect(() => {
    setLoading(false);
  }, [noOfItems]);

  return [isLoading, noOfItems];
};
