import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useGetOrderHook = (data) => {
  const user = useSelector((state) => state.UserReducer);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (user.data) {
      setLoading(true);
    }
  }, [user]);

  useEffect(() => {
    if (isLoading)
      fetch(`https://api.appygo.io/get/order/${user.data.userid}`)
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
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) setLoading(false);
  });

  return [isLoading, isSuccess];
};
