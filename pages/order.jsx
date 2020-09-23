import Link from "next/link";

import { useSelector } from "react-redux";
import { useGetOrderHook } from "../hooks/getOrderHook";
import MainLayout from "../layouts/MainLayout";

const OrderItem = (props) => {
  const { code, status, description, total } = props;
  return (
    <Link href={`/order/${code}`}>
      <tr className="cursor-pointer">
        <td className="border border-teal-400 text-center">{code}</td>
        <td className="border border-teal-400 text-center">{description}</td>
        <td className="border border-teal-400 text-center">{status}</td>
        <td className="border border-teal-400 text-center">{total}</td>
      </tr>
    </Link>
  );
};

export default function Order() {
  const [loading, order] = useGetOrderHook();

  return (
    <MainLayout>
      {loading && <h1>Loading...</h1>}
      <div className="w-3/4 mx-auto my-10 pb-6 border border-teal-400">
        <h1 className="py-2 px-6 bg-teal-400 border-b border-teal-200 text-white text-2xl font-bold">
          Order
        </h1>
        <table className="mx-auto my-5 w-3/4 table-fixed">
          <thead>
            <tr>
              <th className="w-1/4 border bg-teal-400 border border text-white">
                Order Code
              </th>
              <th className="w-1/2 border bg-teal-400 border border text-white">
                Description
              </th>
              <th className="w-1/4 border bg-teal-400 border border text-white">
                Status
              </th>
              <th className="w-1/4 border bg-teal-400 border border text-white">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order.map((elm, index) => {
                return (
                  <OrderItem
                    key={index}
                    code={elm.code}
                    status={elm.status}
                    description={elm.description}
                    total={elm.total}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
