import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useSelector } from "react-redux";

export const useCheckVoucherHook = (data) => {
  const [isLoading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);
  const user = useSelector((state) => state.UserReducer);
  const cart = useSelector((state) => state.CartReducer.product);

  useEffect(() => {
    if (data != null) setLoading(true);
  }, [data]);

  if (isLoading) {
    fetch(`https://api.appygo.io/check/voucher?voucherCode=${data}`)
      .then((res) => {
        try {
          return res.json();
        } catch (err) {
          console.warn(e);
        }
      })
      .then((res) => {
        setLoading(false);
        setValid(res);
      })
      .catch((err) => {
        setLoading(false);
        setValid(false);
      });
  }

  useEffect(() => {
    // console.log("Component did update");
  }, [isLoading]);

  return [isLoading, valid];
};
