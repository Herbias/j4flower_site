import MainLayout from "../layouts/MainLayout";
import CarouselLayout from "../components/Carousel/CarouselLayout";
import QuickBuild from "../layouts/QuickBuild";
import Filter from "../components/Filter/Filter";
import Products from "../components/Products/Products";

import { useSelector } from "react-redux";

import { useState, useCallback, useEffect } from "react";
import { useProductsHook } from "../hooks/productsHook";

import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT);

const Index = (props) => {
  const quickBuild = useSelector((state) => state.QuickBuildReducer.quickBuild);
  // let selected = null;
  const [selected, setSelected] = useState(null);
  const [isLoading, products] = useProductsHook(
    quickBuild.category,
    selected ? selected : null
  );
  const [deviceData, setDeviceData] = useState(null);

  const HandleChange = useCallback(async (name, value) => {
    setSelected({ ...selected, [name]: value });
  });

  useEffect(() => {
    if (!localStorage.getItem("guestId"))
      setDeviceData({
        os: window.navigator.oscpu,
        browser: window.navigator.userAgent,
      });
  }, []);

  useEffect(() => {
    if (deviceData) socket.emit("visit", deviceData);
  }, [deviceData]);

  useEffect(() => {
    socket.on("visitor", (data) => {
      if (!localStorage.getItem("guestId"))
        localStorage.setItem("guestId", data);
    });
  });

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
      <div></div>
    </MainLayout>
  );
};

export default React.memo(Index);
