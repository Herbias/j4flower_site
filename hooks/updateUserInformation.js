import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import { useSelector, useDispatch } from "react-redux";
import { ToUpdate } from "../redux/actions/CartAction";

export const useUpdateUserInformation = (name, data) => {
  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch;

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (data) {
      setLoading(true);
    } else {
      setLoading(false);
      setSuccess(false);
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      data["userid"] = user.data.userid;
      fetch(`http://localhost:3001/update/${name}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
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
          // setLoading(false);
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
