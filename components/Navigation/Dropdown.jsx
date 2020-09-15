import { useSelector, useDispatch } from "react-redux";
import { useGetCartItem } from "../../hooks/getCartItemHook";
import { useState, useEffect } from "react";
import { AddToCart, ToUpdate } from "../../redux/actions/CartAction";
import { useUpdateQuantity } from "../../hooks/updateQuantityHook";

import Link from "next/link";

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

const Item = (props) => {
  const { name, price, image, quantity, data } = props;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.CartReducer);

  const [changeQuanty, setChangeQuantity] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [loading, success] = useUpdateQuantity(data);

  useEffect(() => {
    setChangeQuantity(false);
  }, [!loading && success]);

  const UpdateQuantity = (toUpdate, quantity, data) => {
    dispatch(AddToCart(toUpdate, quantity, data));
  };

  return (
    <div className="mb-1 text-green-500">
      <div className="bg-white p-2">
        <Link
          href={`/shop/${data.categoryName}/${data.name.replace(/\s/g, "-")}/${
            data.id
          }`}
        >
          <a>{name}</a>
        </Link>

        <div className="flex ">
          <img className="w-10 h-10 mr-1" src={`/product/${image}`} />
          <span className="text-left text-xs text-gray-600">
            description, lorem ipsum, dorseit.
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Qty: {currentQuantity}</span>
          <span>&#8369;{(price * currentQuantity).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <button
            onClick={(e) => {
              setChangeQuantity(true);
            }}
            className={`w-1/2 p-2 btn border ${changeQuanty ? "hidden" : ""}`}
          >
            Change Qty.
          </button>
          <input
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(e.target.value)}
            className={`w-1/4 p-2 btn border ${changeQuanty ? "" : "hidden"}`}
          />
          <button
            onClick={(e) => UpdateQuantity(true, currentQuantity, data)}
            className={`w-1/4 p-2 btn border ${changeQuanty ? "" : "hidden"}`}
          >
            OK
          </button>
          <button className="w-1/2 p-2 btn border">Delete</button>
        </div>
      </div>
    </div>
  );
};

const Dropdown = (props) => {
  const { title, Show, Hide } = props;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.CartReducer);

  const [isLoading, cartItem] = useGetCartItem();

  const [items, setItems] = useState(null);

  useEffect(() => {
    if (cartItem) setItems(cartItem);
  }, [isLoading]);

  return (
    <div
      className="w-64 -ml-16 p-2 absolute left-auto bg-teal-400 z-50"
      // onMouseEnter={Show}
      // onMouseLeave={Hide}
    >
      <h3 className="text-left font-bold">{title}</h3>
      {(!cartItem && title == "Wishlist") ||
        (!cartItem && title == "Cart" && <NoItem title={title} />)}
      {!isLoading &&
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
      {/* <h3 className="font-bold">
        Sub-total:
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "PHP",
        }).format(
          cartItem &&
            cartItem.reduce((a, b) => {
              return a.price * a.quantity + b.price * b.quantity;
            })
        )}
      </h3> */}
    </div>
  );
};

export default Dropdown;
