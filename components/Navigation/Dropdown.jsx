const Item = () => {
  return (
    <div className="mb-1 text-green-500">
      <div className="bg-white p-2">
        <h6>Sample Product #1</h6>
        <div className="flex ">
          <img className="w-10 h-10 mr-1" src="./product/product.png" />
          <span className="text-left text-xs text-gray-600">
            description, lorem ipsum, dorseit.
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Qty: 100</span>
          <span>&#8369;1000.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <button className="w-1/2 p-2 btn border">Add to Cart</button>
          <button className="w-1/2 p-2 btn border">Delete</button>
        </div>
      </div>
    </div>
  );
};

const Dropdown = (props) => {
  const { title, Show, Hide } = props;

  return (
    <div
      className="w-56 -ml-16 p-2 absolute left-auto bg-teal-400 z-40"
      onMouseEnter={Show}
      onMouseLeave={Hide}
    >
      <h3 className="text-left font-semibold">{title}</h3>
      <Item />
    </div>
  );
};

export default Dropdown;
