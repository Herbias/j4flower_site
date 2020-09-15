import OrderItem from "./OrderItem";
import DiscountSection from "./DiscountSection";
import { useState, useEffect } from "react";

export default function Order(props) {
  const { delivery, setDelivery, setData } = props;

  const installationData = {
    quantity: 1,
    name: "Software Installation",
    price: 3000,
  };

  const [orderData, setOrderData] = useState(null);
  const [order, setOrder] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [installation, setInstallation] = useState(null);

  useEffect(() => {
    if (!orderData) {
      const data = JSON.parse(localStorage.getItem("order"));
      setOrderData(data);
      setData(data);
    }

    if (orderData && !order) setOrder(orderData.order);
    if (orderData && !voucher) setVoucher(orderData.voucher);
    if (orderData && !installation) setInstallation(orderData.installation);
  }, [orderData]);

  let total = 0;
  let totalDiscount = 0;
  let grandTotal = 0;

  if (order)
    order.forEach((elm) => {
      total += elm.data.price * elm.data.quantity;
    });

  if (installation) total += installationData.price * installationData.quantity;

  if (voucher != null && voucher.length > 0)
    voucher.forEach((elm) => {
      totalDiscount += elm.percentage ? total * elm.rate : elm.rate;
    });

  grandTotal = total - totalDiscount;

  return (
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
          {order &&
            order.map((elm, index) => {
              return (
                <OrderItem
                  key={index}
                  name={elm.data.name}
                  quantity={elm.data.quantity}
                  totalPrice={elm.data.price * elm.data.quantity}
                />
              );
            })}
          {installation && (
            <OrderItem
              name={installationData.name}
              quantity={installationData.quantity}
              totalPrice={installationData.quantity * installationData.price}
            />
          )}
          {voucher != null && voucher.length > 0 && (
            <DiscountSection
              total={total}
              totalDiscount={totalDiscount}
              appliedVoucher={voucher}
            />
          )}
          {delivery && (
            <>
              <tr>
                <td
                  className="px-2 w-3/4 bg-teal-400 border border-teal-200 text-white font-bold"
                  colSpan={2}
                >
                  Shipping Fee:
                </td>
                <td className="border border-teal-400 text-center">TBD</td>
              </tr>
            </>
          )}

          <tr>
            <td
              className="px-2 w-3/4 bg-teal-400 border border-teal-200 text-white font-bold"
              colSpan={2}
            >
              Sub-total:
            </td>
            <td className="border border-teal-400 text-center">
              &#8369; {total && total.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td
              className="px-2 w-3/4 bg-teal-400 border border-teal-200 text-white font-bold"
              colSpan={2}
            >
              Grand Total:
            </td>
            <td className="border border-teal-400 text-center">
              &#8369; {grandTotal.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-red-500 text-sm">
        NOTE: We will call through phone call to confirm your order and order
        will be adjusted if there a qualified promo.
      </p>
      <br />
      <div className="flex items-center justify-center">
        <button
          onClick={() => setDelivery(true)}
          className={`p-2 ${
            delivery ? "bg-teal-500 text-white font-bold" : "bg-white"
          } border`}
        >
          Delivery
        </button>
        <button
          onClick={() => setDelivery(false)}
          className={`p-2 ${
            !delivery ? "bg-teal-500 text-white font-bold" : "bg-white"
          } border`}
        >
          Pick-up
        </button>
      </div>
    </div>
  );
}
