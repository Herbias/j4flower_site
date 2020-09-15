const Item = ({ name, quantity, price }) => {
  return (
    <>
      <tr>
        <td className="border text-center">{name}</td>
        <td className="border text-center">{quantity}</td>
        <td className="border text-center">{price.toFixed(2)}</td>
      </tr>
    </>
  );
};

export default function OrderProduct(props) {
  const { products } = props;
  return (
    <div className="w-full m-auto">
      <table className="w-3/4 table-fixed m-auto">
        <thead>
          <tr>
            <th className="border bg-teal-400 text-white">Name</th>
            <th className="border bg-teal-400 text-white">Quantity</th>
            <th className="border bg-teal-400 text-white">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((elm, index) => {
            return (
              <Item
                name={elm.name}
                quantity={elm.quantity}
                price={elm.price}
                key={index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
