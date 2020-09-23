import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useCreateOrderHook = (data, delivery) => {
  const user = useSelector((state) => state.UserReducer);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (data) {
      setLoading(true);
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      data["userid"] = user.data.userid;
      data["usertype"] = user.isLogin ? "registered" : "guest";
      data["delivery"] = delivery;
      fetch(`http://localhost:3001/create/order`, {
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
    if (isSuccess) {
      setLoading(false);
    }
  }, [isSuccess]);

  return [isLoading, isSuccess];
};
