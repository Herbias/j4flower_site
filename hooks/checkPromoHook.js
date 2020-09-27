import { useState, useEffect } from "react";

export const useCheckPromoHook = (data) => {
  const [checkingPromo, setCheckingPromo] = useState(false);
  const [promoList, setPromoList] = useState(false);

  useEffect(() => {
    if (data) setCheckingPromo(true);
  }, [data]);

  if (checkingPromo) {
    // console.log(data);
    fetch(`https://api.appygo.io/check/promo`, {
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
        setCheckingPromo(false);
        setPromoList({ text: "dummy" });
      })
      .catch((err) => {
        throw err;
      });
  }

  return [checkingPromo, promoList];
  //   useEffect(() => {
  //     console.log("creating order");
  //   });
};
