import MainLayout from "../layouts/MainLayout";
import Signup from "../components/Signup";
import { useSelector, useDispatch } from "react-redux";
import ShippingDetails from "../components/ShippingDetails";
import Order from "../components/Order/Order";
import { useState, useEffect } from "react";
import { useCreateOrderHook } from "../hooks/createOrderHook";
import { useRouter } from "next/router";

import { UpdateCartItems } from "../redux/actions/CartAction";

export default function CreateOrder(props) {
  const router = useRouter();
  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const [delivery, setDelivery] = useState(true);
  const [placeOrder, setPlaceOrder] = useState(false);
  const [data, setData] = useState(null);

  const [creatingOrder, createSuccess] = useCreateOrderHook(
    placeOrder ? data : null,
    placeOrder ? delivery : null
  );

  useEffect(() => {
    if (createSuccess) {
      localStorage.removeItem("order");
      dispatch(UpdateCartItems(createSuccess.count));
      router.push("/order/" + createSuccess.ordercode);
    }
  }, [createSuccess]);

  return (
    <MainLayout>
      <div className="pl-6 py-1 flex items-center w-full border-b border-teal-400 bg-gray-200">
        <a className="text-teal-400 capitalize" href="/order">
          Order &#8594; &nbsp;
        </a>
        <a className="text-teal-400 capitalize">Create Order</a>
      </div>
      <div className="w-full flex">
        <div className="w-3/5 ml-10 mr-2 my-10 pb-6 border border-teal-400">
          <h1 className="py-2 px-6 bg-teal-400 border-b border-teal-200 text-white text-2xl font-bold">
            {user.isLogin
              ? "Shipping Details"
              : `Your are not logged in - Create an account`}
          </h1>
          {!user.isLogin && <Signup />}
          {user.isLogin && <ShippingDetails />}
        </div>
        <div className="w-2/5 ml-2 mr-10 my-10  pb-6 border border-teal-400">
          <h1 className="py-2 px-6 bg-teal-400 border-b border-teal-400 text-white text-2xl font-bold">
            Order
          </h1>
          <Order
            delivery={delivery}
            setDelivery={setDelivery}
            setData={setData}
          />
          <button
            onClick={() => setPlaceOrder(true)}
            className="float-right text-white font-bold p-2 mx-6 bg-teal-400"
          >
            Place order
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
