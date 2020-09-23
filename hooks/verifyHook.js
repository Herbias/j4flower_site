import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export const useVerifyHook = (name, value) => {
  const [isLoading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (value != null) setLoading(true);
  }, [value]);

  if (isLoading) {
    fetch(`http://localhost:3001/check/${name}?value=${value}`)
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
    console.log("Component did update");
  }, [isLoading]);

  return [isLoading, valid];
};
