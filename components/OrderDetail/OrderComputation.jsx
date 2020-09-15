import { useEffect, useState } from "react";

const Voucher = ({ vouchers, subtotal }) => {
  return (
    <>
      <tr>
        <td
          colSpan="2"
          className="border text-center text-white bg-teal-400 font-bold"
        >
          Voucher
        </td>
      </tr>
      {vouchers &&
        vouchers.map((elm, index) => {
          return (
            <>
              {" "}
              <tr>
                <td className="border text-center">{elm.code}</td>
                <td className="border text-center">
                  {elm.percentage ? subtotal * elm.rate : elm.rate}
                </td>
              </tr>{" "}
            </>
          );
        })}
      {/* <tr>
        <td className="border text-center">SAMPLE VOUCHER 1</td>
        <td className="border text-center"> 200.00</td>
      </tr>{" "} */}
    </>
  );
};

export default function OrderComputation(props) {
  const { products, vouchers, progress, delivery, deliveryfee } = props;

  let subtotal = 0;
  let discount = 0;
  let grandtotal = 0;

  if (products)
    products.forEach((element) => {
      subtotal += element.price;
    });

  vouchers.forEach((elm) => {
    discount += elm.percentage ? subtotal * elm.rate : elm.rate;
  });

  grandtotal = subtotal - discount;

  return (
    <div className="flex flex-row-reverse">
      <table className="w-1/4">
        <tbody>
          {vouchers.length > 0 && (
            <Voucher vouchers={vouchers} subtotal={subtotal} />
          )}
          <tr>
            <td className="pr-4 border text-right text-white font-bold bg-teal-400">
              Discount
            </td>
            <td className="border text-center">{discount.toFixed(2)}</td>
          </tr>
          {delivery == 1 ? (
            <>
              <tr>
                <td className="pr-4 border text-right text-white font-bold bg-teal-400">
                  Shipping Fee
                </td>
                {delivery && progress != "Confirming" && (
                  <td className="border text-center">{deliveryfee}</td>
                )}
                {delivery && progress == "Confirming" && (
                  <td className="border text-center">TBD</td>
                )}
              </tr>
            </>
          ) : (
            <>
              <tr>
                <td className="pr-4 border text-right text-white font-bold bg-teal-400">
                  Shipping Fee
                </td>
                <td className="border text-center">{deliveryfee.toFixed(2)}</td>
              </tr>
            </>
          )}
          {/* <tr>
            <td className="pr-4 border text-right text-white font-bold bg-teal-400">
              Shipping Fee
            </td>
            {delivery && progress != "Confirming" && (
              <td className="border text-center">{deliveryfee}</td>
            )}
            {delivery && progress == "Confirming" && (
              <td className="border text-center">TBD</td>
            )}
            {!delivery && progress == "Confirming" && (
              <td className="border text-center">0.00</td>
            )}
          </tr> */}
          <tr>
            <td className="pr-4 border text-right text-white font-bold bg-teal-400">
              Sub-total
            </td>
            <td className="border text-center">{subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="pr-4 border text-right text-white font-bold bg-teal-400">
              Grand total
            </td>
            <td className="border text-center">{grandtotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
