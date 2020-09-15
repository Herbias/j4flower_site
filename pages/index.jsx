import MainLayout from "../layouts/MainLayout";
import CarouselLayout from "../components/Carousel/CarouselLayout";
import QuickBuild from "../layouts/QuickBuild";
import Filter from "../components/Filter/Filter";
import Products from "../components/Products/Products";

import { useSelector } from "react-redux";

import { useState, useCallback, useEffect } from "react";
import { useProductsHook } from "../hooks/productsHook";
import { useUserManagementHook } from "../hooks/userManagementHook";

const Index = (props) => {
  const quickBuild = useSelector((state) => state.QuickBuildReducer.quickBuild);
  // let selected = null;
  const [selected, setSelected] = useState(null);
  const [isLoading, products] = useProductsHook(
    quickBuild.category,
    selected ? selected : null
  );

  const HandleChange = useCallback(async (name, value) => {
    setSelected({ ...selected, [name]: value });
  });

  // useEffect(() => {
  //   if (!localStorage.getItem("guestId"))
  //     setDeviceData({
  //       os: window.navigator.oscpu,
  //       browser: window.navigator.userAgent,
  //     });
  // }, []);

  // useEffect(() => {
  //   if (deviceData) socket.emit("visit", deviceData);
  // }, [deviceData]);

  // useEffect(() => {
  //   socket.on("visitor", (data) => {
  //     if (!localStorage.getItem("guestId"))
  //       localStorage.setItem("guestId", data);
  //   });
  // });

  useEffect(() => {
    setSelected(null);
  }, [quickBuild.category]);

  // useEffect(() => {
  //   console.log(selected);
  //   console.log(products);
  // });

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

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
      <div className="w-full my-10 p-2 shadow-md">
        <div className="flex flex-wrap justify-center items-center m-auto">
          <img className="w-auto h-32 px-4 py-6" src="/brand/intel.png" />
          <img className="w-auto h-32 px-4 py-6" src="/brand/amd.png" />
          <img className="w-auto h-32 px-4 py-6" src="/brand/gigabyte.svg" />
          <img className="w-auto h-32 px-4 py-6" src="/brand/msi.png" />
          <img className="w-auto h-32 px-4 py-6" src="/brand/asus.png" />
          <img className="w-auto h-32 px-4 py-6" src="/brand/xigmatek.png" />
          <img className="w-auto h-32 px-4 py-6" src="/brand/gskill.jpg" />
        </div>
        <h3 className="text-center text-4xl text-teal-500 font-black">
          Many more to come...
        </h3>
      </div>
    </MainLayout>
  );
};

export default React.memo(Index);
