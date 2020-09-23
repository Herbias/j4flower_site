import MainLayout from "../layouts/MainLayout";
import { useGetCartItem } from "../hooks/getCartItemHook";
import { useUpdateQuantity } from "../hooks/updateQuantityHook";
import { useCreateOrderHook } from "../hooks/createOrderHook";

import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  ToUpdate,
  UpdateCartItems,
} from "../redux/actions/CartAction";
import { useEffect, useState, useRef } from "react";

import CartItem from "../components/Cart/CartItem";
import { useCheckVoucherHook } from "../hooks/checkVoucherHook";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
import { useDeleteFromCartHook } from "../hooks/deleteFromCartHook";

const OrderItem = (props) => {
  const { name, quantity, totalPrice } = props;

  return (
    <tr>
      <td className="px-2 border border-teal-400 ">{name}</td>
      <td className="border border-teal-400 text-center">{quantity}</td>
      <td className="border border-teal-400 text-center">
        &#8369; {totalPrice.toFixed(2)}
      </td>
    </tr>
  );
};

const DiscountSectiom = (props) => {
  const { total, totalDiscount, appliedVoucher } = props;

  return (
    <>
      <tr>
        <td
          className="px-2 w-3/4 bg-teal-400 border border-teal-400 text-white font-bold"
          colSpan={2}
        >
          Discount:
        </td>
        <td className="border border-teal-400 text-center">
          &#8369; {totalDiscount.toFixed(2)}
        </td>
      </tr>
      {appliedVoucher.length &&
        appliedVoucher.map((elm, index) => {
          return (
            <tr key={index}>
              <td className="px-2 w-3/4 border border-teal-400" colSpan={2}>
                {elm.code}
              </td>
              <td className="border border-teal-400 text-center">
                &#8369; {elm.percentage ? total * elm.rate : elm.rate}
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default function Cart(props) {
  const cart = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, cartItem] = useGetCartItem();

  const [selectAll, setSelectAll] = useState(null);
  const [selectAllClicked, setSelectAllClicked] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [softwareInstallation, setSoftwareInstallation] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState([]);
  const [voucher, setVoucher] = useState(null);
  const [voucherInput, SetVoucherInput] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  const [isChecking, valid] = useCheckVoucherHook(voucher ? voucher : null);
  const [deleting, deleted] = useDeleteFromCartHook(
    deleteItem ? deleteItem : null
  );

  const selectAllRef = useRef();

  const installationData = {
    quantity: 1,
    name: "Software Installation",
    price: 3000,
  };

  let total = 0;
  let totalDiscount = 0;
  let subTotal = 0;

  if (orderList)
    orderList.forEach((elm) => {
      total += elm.data.price * elm.data.quantity;
    });

  if (softwareInstallation)
    total += installationData.price * installationData.quantity;

  if (appliedVoucher.length > 0)
    appliedVoucher.forEach((elm) => {
      totalDiscount += elm.percentage ? total * elm.rate : elm.rate;
    });

  subTotal = total - totalDiscount;

  useEffect(() => {
    setSelectAll(true);
  }, []);

  useEffect(() => {
    if (cartItem)
      setSelectedItems(
        cartItem.map((elm) => {
          return { [elm.name]: true, data: elm };
        })
      );
  }, [cartItem]);

  useEffect(() => {
    if (isLoading) dispatch(ToUpdate(false));
  }, [isLoading]);

  useEffect(() => {
    if (selectAllClicked) setSelectAll(true);
    else setSelectAll(false);
  }, [selectAllClicked]);

  useEffect(() => {
    if (cartItem)
      setSelectedItems(
        cartItem.map((elm) => {
          return { [elm.name]: selectAll, data: elm };
        })
      );
  }, [selectAll]);

  useEffect(() => {
    setOrderList(
      selectedItems.filter((elm) => {
        return elm[Object.keys(elm)[0]] == true;
      })
    );
  }, [selectedItems]);

  useEffect(() => {
    if (deleteItem) {
      setSelectedItems(
        selectedItems.filter((elm) => {
          return elm.data.name != deleteItem.name;
        })
      );
    }
  }, [deleteItem]);

  useEffect(() => {
    if (deleted) setDeleteItem(null);
    dispatch(UpdateCartItems(deleted));
  }, [deleting]);

  useEffect(() => {
    if (!isChecking && valid) {
      let duplicateFound = false;
      appliedVoucher.forEach((elm) => {
        if (elm.code == valid.code) duplicateFound = true;
      });

      if (!duplicateFound) appliedVoucher.push(valid);

      setAppliedVoucher(appliedVoucher);
      setVoucher(null);
      SetVoucherInput("");
    }
  }, [valid]);

  useEffect(() => {
    if (placeOrder) {
      localStorage.setItem(
        "order",
        JSON.stringify({
          order: selectedItems,
          voucher: appliedVoucher,
          installation: softwareInstallation,
        })
      );
      router.push("/create-order");
    }
  }, [placeOrder]);

  const HandleSelect = (name, checked, data) => {
    selectAllRef.current.checked = false;
    setSelectedItems(
      selectedItems.map((elm) => {
        return {
          [Object.keys(elm)[0]]:
            Object.keys(elm)[0] == name ? checked : elm[Object.keys(elm)[0]],
          data: elm.data,
        };
      })
    );
  };

  //check compability on order
  //check promo
  //check voucher
  //count build by counting processor and motherboard
  //ex (motherboard + processor) / 2

  return (
    <>
      <MainLayout>
        <div className="w-full flex">
          <div className="w-3/5 ml-10 mr-2 my-10 pb-6 border border-teal-400">
            <h1 className="py-2 px-6 bg-teal-400 border-b border-teal-200 text-white text-2xl font-bold">
              Cart
            </h1>
            <div className="p-2">
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th className="w-8 bg-teal-400 border border-teal-400">
                      <input
                        ref={selectAllRef}
                        type="checkbox"
                        defaultChecked={selectAllClicked}
                        onChange={(e) => setSelectAllClicked(e.target.checked)}
                      />
                    </th>
                    <th className="w-1/2 bg-teal-400 border border-teal-400 text-white">
                      Product
                    </th>
                    <th className="w-24 bg-teal-400 border border-teal-400 text-white">
                      Unit Price
                    </th>
                    <th className="w-32 bg-teal-400 border border-teal-400 text-white">
                      Quantity
                    </th>
                    <th className="w-24 bg-teal-400 border border-teal-400 text-white">
                      Total Price
                    </th>
                    <th className="w-24 bg-teal-400 border border-teal-400 text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    selectedItems &&
                    selectedItems.map((elm, index) => {
                      return (
                        <CartItem
                          key={index}
                          image={elm.data.image}
                          name={elm.data.name}
                          description={elm.data.brand}
                          unitPrice={elm.data.price}
                          quantity={elm.data.quantity}
                          selected={elm[elm.data.name]}
                          data={elm.data}
                          HandleSelect={HandleSelect}
                          DeleteItem={setDeleteItem}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-2/5 ml-2 mr-10 my-10  pb-6 border border-teal-400">
            <h1 className="py-2 px-6 bg-teal-400 border-b border-teal-400 text-white text-2xl font-bold">
              Order
            </h1>
            <div className="p-2">
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th className="w-1/2 border bg-teal-400 border border-teal-400 text-white">
                      Product
                    </th>
                    <th className="w-1/4 border bg-teal-400 border border-teal-400 text-white">
                      Quantity
                    </th>
                    <th className="w-1/4  border bg-teal-400 border border-teal-400 text-white">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderList &&
                    orderList.map((elm, index) => {
                      return (
                        <OrderItem
                          key={index}
                          name={elm.data.name}
                          quantity={elm.data.quantity}
                          totalPrice={elm.data.price * elm.data.quantity}
                        />
                      );
                    })}
                  {softwareInstallation && (
                    <OrderItem
                      name={installationData.name}
                      quantity={installationData.quantity}
                      totalPrice={
                        installationData.quantity * installationData.price
                      }
                    />
                  )}
                  {appliedVoucher.length > 0 && (
                    <DiscountSectiom
                      total={total}
                      totalDiscount={totalDiscount}
                      appliedVoucher={appliedVoucher}
                    />
                  )}

                  <tr>
                    <td
                      className="px-2 w-3/4 bg-teal-400 border border-teal-400 text-white font-bold"
                      colSpan={2}
                    >
                      Sub-Total:
                    </td>
                    <td className="border border-teal-400 text-center">
                      &#8369; {subTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <input
                defaultChecked={softwareInstallation}
                onChange={() => {
                  setSoftwareInstallation(!softwareInstallation);
                }}
                type="checkbox"
              />
              <label className="ml-2">
                Add licence software installation (Windows, MS Office,
                Anti-virus, etc.)
              </label>
              <br />
              <br />
              {valid == false && (
                <label className="text-red-600">
                  Invalid voucher code!
                  <br />
                </label>
              )}

              <input
                value={voucherInput}
                onChange={(e) => SetVoucherInput(e.target.value)}
                className="h-10 pl-2 border border-teal-400"
                type="text"
                placeholder="Enter voucher"
              />
              <button
                onClick={() => setVoucher(voucherInput)}
                className="text-white font-bold p-2 mx-2 bg-teal-400"
              >
                Apply
              </button>
            </div>

            <button
              onClick={() => {
                setPlaceOrder(orderList.length > 0 ? true : false);
              }}
              className="float-right text-white font-bold p-2 mx-6 bg-teal-400"
            >
              Place order
            </button>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
