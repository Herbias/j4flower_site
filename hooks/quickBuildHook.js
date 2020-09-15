import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import data from "../pages/api/contents/quickbuild.json";

export const useQuickBuildHook = () => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    // fetch(`http://localhost:3000/api/contents/quickbuild`)
    //   .then((res) => {
    //     try {
    //       return res.json();
    //     } catch (err) {
    //       console.warn(e);
    //     }
    //   })
    //   .then((data) => {
    //     setCategories(data.categories);
    //   })
    //   .catch((err) => {});
    setCategories(data["categories"]);
  }, []);
  return categories;
};
