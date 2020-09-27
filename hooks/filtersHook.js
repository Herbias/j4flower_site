import { useEffect, useState } from "react";

export const useFiltersHook = (category) => {
  const [filters, setFilters] = useState(null);
  const [isLoading, setLoading] = useState(false);

  if (isLoading) {
    fetch("http://api.appygo.io/get/products/filters/" + category)
      .then((res) => res.json())
      .then((data) => {
        setFilters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
  }, [category]);

  return [isLoading, filters];
};
