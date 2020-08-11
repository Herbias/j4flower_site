import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export const useProductsHook = (category, data) => {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (category && data == null)
      fetch(`http://localhost:3001/get/product/` + category)
        .then((res) => {
          try {
            return res.json();
          } catch (err) {
            console.warn(e);
          }
        })
        .then((data) => {
          setLoading(false);
          setProducts(data);
        })
        .catch((err) => {
          setLoading(false);
        });

    if (category && data) {
      let query = "";

      let a = Object.keys(data);

      let b = [];
      a.forEach((obj) => {
        if (data[obj] != "" && data[obj] != null) {
          b.push(`${obj}=` + data[obj]);
        } else delete data[obj];
      });

      let c = b.length > 1 ? b.join("&") : b.join("").trim();

      fetch(`http://localhost:3001/get/product/${category}\?${c}`)
        .then((res) => {
          try {
            return res.json();
          } catch (err) {
            console.warn(e);
          }
        })
        .then((data) => {
          setLoading(false);
          setProducts(data);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [category && data, category, data]);

  useEffect(() => {
    console.log("Component did update");
  }, [products]);

  return [isLoading, products];
};
