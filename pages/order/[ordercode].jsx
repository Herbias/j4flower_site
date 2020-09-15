import OrderComputation from "../../components/OrderDetail/OrderComputation";
import OrderProduct from "../../components/OrderDetail/OrderedProducts";
import OrderInformation from "../../components/OrderDetail/OrderInformation";
import MainLayout from "../../layouts/MainLayout";

import { useGetOrderDeatilHook } from "../../hooks/getOrderDetailhook";
import { useEffect, useState } from "react";

export default function OrderCode(props) {
  const { ordercode } = props;
  const [orderDetail, setOrderDetail] = useState(null);
  const [detail, setDetail] = useState(null);

  const [loading, orderData] = useGetOrderDeatilHook(
    !orderDetail ? { ordercode } : null
  );

  useEffect(() => {
    if (orderData) setOrderDetail(orderData);
  }, [orderData]);

  // useEffect(() => {
  //   if (orderDetail) {
  //     console.log(orderDetail);
  //     console.log(new Date(orderDetail.detail.date).toLocaleDateString());
  //   }
  // }, [orderDetail]);

  return (
    <MainLayout>
      <div className="pl-6 py-1 flex items-center justify-center w-full border-b border-teal-400 bg-gray-200">
        {" "}
        <a className="text-teal-400 capitalize" href="/order">
          Order &#8594; &nbsp;
        </a>
        <a className="text-teal-400 capitalize">Order example</a>
      </div>
      <div className="py-2">
        <h1 className="text-center text-2xl font-bold">Order Received</h1>
        <h3 className="text-center">
          Please be open when our representative call.
        </h3>
      </div>
      <div className="p-4">
        {orderDetail && (
          <OrderInformation
            detail={orderDetail.detail}
            history={orderDetail.history}
          />
        )}
        <br />
        {orderDetail && <OrderProduct products={orderDetail.products} />}
        <br />
        {orderDetail && (
          <OrderComputation
            products={orderDetail.products}
            vouchers={orderDetail.vouchers}
            progress={
              orderDetail.history[orderDetail.history.length - 1].description
            }
            delivery={orderDetail.detail.delivery}
            deliveryfee={orderDetail.detail.deliveryfee}
          />
        )}
      </div>
    </MainLayout>
  );
}

OrderCode.getInitialProps = async (ctx) => {
  return ctx.query;
};
