import { useState, useEffect } from "react";

export const useCreateAccountHook = (data) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (data && !isSuccess) {
      console.log("creating account");
      setLoading(true);
    }
    // if (data && !isLoading && !isSuccess) setLoading(true);
  }, [data]);

  useEffect(() => {
    if (isLoading)
      fetch(`http://localhost:3001/create/account`, {
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
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) setLoading(false);
  }, [isSuccess]);
  return [isLoading, isSuccess];
};
