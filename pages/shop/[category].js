import { useState, useCallback, useEffect } from "react";
import { useProductsHook } from "../../hooks/productsHook";
import { useIconHook } from "../../hooks/iconHook";
import Products from "../../components/Products/Products";
import CustomButton from "../../components/CustomButton";

import { useSelector, useDispatch } from "react-redux";
import { SetCategory } from "../../redux/actions/QuickBuildAction";

import Filter from "../../components/Filter/Filter";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";

const ProductList = (props) => {
  const backButton = useIconHook("chevronLeft");

  const dispatch = useDispatch();
  const quickBuild = useSelector((state) => state.QuickBuildReducer.quickBuild);

  const { category } = props;

  const [selected, setSelected] = useState(null);
  const [isLoading, products] = useProductsHook(
    quickBuild.category,
    selected || typeof selected == "number" ? selected : null
  );

  const HandleChange = useCallback(async (name, value) => {
    setSelected({ ...selected, [name]: value });
  });

  useEffect(() => {
    if (category) dispatch(SetCategory(category));
  }, []);

  return (
    <>
      <MainLayout>
        {/* <div className="flex items-center border-b border-teal-400 bg-gray-200"></div> */}
        <div className="pl-6 py-1 flex items-center w-full border-b border-teal-400 bg-gray-200">
          {" "}
          <a className="text-teal-400 capitalize" href="/">
            Shop &#8594; &nbsp;
          </a>
          <a className="text-teal-400 capitalize">{category} &nbsp;</a>
        </div>
        <div className="block w-full bg-gray-300">
          <Filter
            products={products}
            selected={selected}
            handleChange={HandleChange}
          />
          <Products selected={selected} products={products} />
        </div>
      </MainLayout>
    </>
  );
};

ProductList.getInitialProps = async (ctx) => {
  return ctx.query;
};

export default ProductList;
