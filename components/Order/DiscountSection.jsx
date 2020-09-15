export default function DiscountSectiom(props) {
  const { total, totalDiscount, appliedVoucher } = props;
  console.log(totalDiscount);
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
                &#8369;{" "}
                {elm.percentage
                  ? (total * elm.rate).toFixed(2)
                  : elm.rate.toFixed(2)}
              </td>
            </tr>
          );
        })}
    </>
  );
}
