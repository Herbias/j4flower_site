export default function OrderItem(props) {
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
}
1;
