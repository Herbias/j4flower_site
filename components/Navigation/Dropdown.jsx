import { useSelector } from "react-redux";
import { useGetCartItem } from "../../hooks/getCartItemHook";
import { useState } from "react";

const Item = (props) => {
  const { name, price, image, quantity, data } = props;
  return (
    <div className="mb-1 text-green-500">
      <div className="bg-white p-2">
        <h6>{name}</h6>
        <div className="flex ">
          <img className="w-10 h-10 mr-1" src={`/product/${image}`} />
          <span className="text-left text-xs text-gray-600">
            description, lorem ipsum, dorseit.
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Qty: {quantity}</span>
          <span>&#8369;{(price * quantity).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <button className="w-1/2 p-2 btn border">Add to Cart</button>
          <button className="w-1/2 p-2 btn border">Delete</button>
        </div>
      </div>
    </div>
  );
};

const NoItem = (props) => {
  const { title } = props;
  return (
    <div className="mb-1 text-green-500">
      <div className="bg-white p-2">
        <h6>{`You have no item in your ${title}`}</h6>
      </div>
    </div>
  );
};

const Dropdown = (props) => {
  const { title, Show, Hide } = props;
  const cart = useSelector((state) => state.CartReducer);
  const [isLoading, cartItem] = useGetCartItem();

  let total = 0;

  if (cartItem)
    cartItem.forEach((elm) => {
      total += elm.price * elm.quantity;
    });

  return (
    <div
      className="w-64 -ml-16 p-2 absolute left-auto bg-teal-400 z-50"
      onMouseEnter={Show}
      onMouseLeave={Hide}
    >
      <h3 className="text-left font-semibold">{title}</h3>
      {(!cartItem && title == "Wishlist") ||
        (!cartItem && title == "Cart" && <NoItem title={title} />)}
      {title == "Cart" &&
        cartItem &&
        cartItem.map((elm, index) => {
          return (
            <Item
              key={index}
              name={elm.name}
              price={elm.price}
              quantity={elm.quantity}
              image={elm.image}
              data={elm}
            />
          );
        })}
      <h3 className="font-bold">
        Sub-total:{" "}
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "PHP",
        }).format(total)}
      </h3>
    </div>
  );
};

export default Dropdown;
