import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

import { useFilterProductHook } from "../../hooks/filterProductHook";
import { useSelector } from "react-redux";

const Product = (props) => {
  const { selected, products } = props;
  const currentCategory = useSelector(
    (state) => state.QuickBuildReducer.quickBuild.category
  );

  const [isLoading, filterProduct] = useFilterProductHook(selected);

  return (
    <div className="h-1/2 flex flex-wrap p-5 relative">
      {products &&
        products.map((elm, index) => {
          return (
            <ProductCard
              image={elm.image}
              name={elm.name}
              price={elm.price}
              index={index}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default React.memo(Product);
