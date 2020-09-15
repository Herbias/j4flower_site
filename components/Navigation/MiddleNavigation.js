import CustomButton from "../CustomButton";
import { useIconHook } from "../../hooks/iconHook";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartItemCount } from "../../hooks/getCartItemCount";
import { useRouter } from "next/router";
import Link from "next/link";

import { ShowMiniCart } from "../../redux/actions/UserInterfaceAction";
import { useEffect, useState } from "react";

import { ToUpdate, UpdateCartItems } from "../../redux/actions/CartAction";
import Dropdown from "./Dropdown";

const MiddleNavigation = (props) => {
  const searchIcon = useIconHook("search");
  const cartIcon = useIconHook("cart");
  const logo = useIconHook("logo");

  const router = useRouter();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer);
  const cart = useSelector((state) => state.CartReducer);
  const ui = useSelector((state) => state.UserInterfaceReducer);

  // const [count, setCount] = useState(null);
  // const [update, setUpdate] = useState(null);

  const [loading, cartItemCount] = useGetCartItemCount(
    user ? user.isLogin : null
  );

  useEffect(() => {
    if (cartItemCount) {
      dispatch(UpdateCartItems(cartItemCount));
    }
  }, [cartItemCount]);

  // useEffect(() => {
  //   setCount(cartItemCount);
  // }, [cartItemCount]);

  // useEffect(() => {
  //   setUpdate(null);
  // }, [count]);

  return (
    <div className="w-full m-6 pt-4 flex items-center">
      <Link href="/">
        <a className="w-1/4 flex items-center content-center justify-center cursor-pointer">
          <CustomButton
            classNames={"border-2 border-white rounded-full mr-2"}
            size={12}
            view={24}
            icon={logo}
          />
          <span className="font-semibold text-xl tracking-tight">AppyGo</span>
        </a>
      </Link>

      <div className="w-2/4">
        <div className="flex w-full border rounded-r-l text-black">
          <input
            className="h-10 w-11/12 indent-4"
            type="search"
            placeholder="Find it here..."
          />
          <CustomButton
            classNames="py-2 px-4 text-white"
            size={5}
            view={20}
            icon={searchIcon}
          />
        </div>
      </div>
      <Link href="/cart">
        <div
          onMouseEnter={() => {
            dispatch(ShowMiniCart(true));
          }}
          onMouseLeave={() => {
            dispatch(ShowMiniCart(false));
          }}
          className="dropdown-button w-1/4 px-16 flex justify-around"
        >
          <div className="w-2/4 text-center relative inline-block">
            {cart.cartItems > 0 && (
              <div className="absolute z-10 flex justify-center items-center content-center mr-2 w-6 h-6 top-0 right-0 bg-yellow-200 border border-b rounded-full">
                <p className="w-full text-gray-600 text-center font-bold">
                  {cart.cartItems}
                </p>
              </div>
            )}
            <CustomButton
              classNames="h-10 w-10 p-2 inline-block border-white border-2 rounded-full"
              size={5}
              view={20}
              icon={cartIcon}
              type="dropdown"
              title="Cart"
            />
            {ui.showMiniCart && <Dropdown title={"Cart"} />}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MiddleNavigation;
