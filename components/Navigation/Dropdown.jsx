import { useSelector, useDispatch } from "react-redux";
import { useGetCartItem } from "../../hooks/getCartItemHook";
import { useState, useEffect } from "react";
import { AddToCart, UpdateCartItems } from "../../redux/actions/CartAction";
import { useUpdateQuantity } from "../../hooks/updateQuantityHook";

import Link from "next/link";
import { useDeleteFromCartHook } from "../../hooks/deleteFromCartHook";

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
  const { name, price, image, quantity, data, Delete } = props;

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
          <img
            className="w-10 h-10 mr-1"
            src={`http://assets.appygo.io/appygo/image/${data["categoryName"]}/${data["image"]}`}
          />
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
          <button onClick={() => Delete(data)} className="w-1/2 p-2 btn border">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Dropdown = (props) => {
  const { title, items } = props;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.CartReducer);
  const ui = useSelector((state) => state.UserInterfaceReducer);

  const [mounted, setMounted] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const [isLoading, cartItem] = useGetCartItem();
  const [deleting, deleted] = useDeleteFromCartHook(
    deleteItem ? deleteItem : null
  );

  let total = 0;
  if (cartItem && cartItem.length > 0)
    cartItem.forEach((element) => {
      total = element.price * element.quantity;
    });

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (deleted == undefined || deleted == null || (!deleted && deleted != 0)) {
      return;
    } else {
      // console.log(deleted);
      dispatch(UpdateCartItems(deleted));
    }
  }, [deleting]);

  return (
    <div className="dropdown-content w-64 -ml-16 p-2 absolute left-auto bg-teal-400 z-50">
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
              Delete={setDeleteItem}
            />
          );
        })}
      <h3 className="font-bold">
        Sub-total: &nbsp;
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "PHP",
        }).format(total)}
      </h3>
    </div>
  );
};

export default Dropdown;
