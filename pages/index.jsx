import MainLayout from "../layouts/MainLayout";
import CarouselLayout from "../components/Carousel/CarouselLayout";
import QuickBuild from "../layouts/QuickBuild";
import Filter from "../components/Filter/Filter";
import Products from "../components/Products/Products";

import { useDispatch, connect, useSelector } from "react-redux";
import { QuickBuildOpen, SetProducts } from "../redux/actions/QuickBuildAction";
import { bindActionCreators } from "redux";

import { useState, useCallback, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useProductsHook } from "../hooks/productsHook";

const Index = (props) => {
  const dispatch = useDispatch();
  const quickBuild = useSelector((state) => state.QuickBuildReducer.quickBuild);
  // let selected = null;
  const [selected, setSelected] = useState(null);
  const [isLoading, products] = useProductsHook(
    quickBuild.category,
    selected ? selected : null
  );

  const HandleChange = useCallback((name, value) => {
    console.log(`${name} ${value}`);
    setSelected({ ...selected, [name]: value });
    // selected[name] = value;
  });

  useEffect(() => {
    setSelected(null);
  }, [quickBuild.category]);

  useEffect(() => {
    console.log(selected);
    console.log(products);
  });

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <MainLayout>
      <CarouselLayout />
      <QuickBuild>
        <Filter
          products={products}
          selected={selected}
          handleChange={HandleChange}
        />
        <Products selected={selected} products={products} />
      </QuickBuild>
      <div></div>
    </MainLayout>
  );
};

const mapDispatchToprops = (dispatch) => {
  return {
    test: bindActionCreators(QuickBuildOpen, dispatch),
  };
};

export default React.memo(Index);
