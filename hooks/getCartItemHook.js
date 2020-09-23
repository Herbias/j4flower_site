import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useSelector } from "react-redux";

export const useGetCartItem = () => {
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  const user = useSelector((state) => state.UserReducer);
  const cart = useSelector((state) => state.CartReducer);
  const ui = useSelector((state) => state.UserInterfaceReducer);

  useEffect(() => {
    setLoading(true);
    return () => {
      setLoading(false);
      setItems(null);
    };
  }, []);

  useEffect(() => {
    if (ui.showMiniCart) setLoading(true);
  }, [ui.showMiniCart]);

  useEffect(() => {
    setLoading(true);
  }, [cart]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const data = await fetch(`http://localhost:3001/get/cart/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            user.isLogin
              ? { userId: user.data.userid, userType: "registered" }
              : { userId: localStorage.getItem("guestId"), userType: "guest" }
          ),
          signal: abortController.signal,
        });

        data.json().then((res) => setItems(res));
      } catch (e) {
        if (!abortController.signal.aborted) throw e;
      }
    };

    fetchData();

    return () => {
      abortController.abort();
      return;
    };
  }, [isLoading]);

  useEffect(() => {
    if (items) setLoading(false);
  }, [items]);

  return [isLoading, items];
};
