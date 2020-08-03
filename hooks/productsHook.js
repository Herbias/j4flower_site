import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export const useProductsHook = (category, data) => {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    console.log(`products ${data}`);
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
          // console.log(err);
        });

    if (category && data) {
      let query = "";

      let a = Object.keys(data);

      let b = [];
      a.forEach((obj) => {
        b.push(`${obj}=` + data[obj]);
      });

      let c = b.length > 1 ? b.join("&") : b[0];

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
          // console.log(err);
        });
      console.log(c);
    }
  }, [category, data]);

  const getQuery = (category, data) => {
    return new Promise((resolve) => {
      let a = Object.keys(data);

      let b = [];
      a.forEach((obj) => {
        b.push(`${obj}=` + data[obj]);
      });
      let c = b.length > 1 ? b.join("&") : b[0];
      resolve(`https://localhost:3001/api/products/${category}\?${c}`);
    });
  };

  useEffect(() => {
    console.log("Component did update");
  }, [products]);

  return [isLoading, products];
};
