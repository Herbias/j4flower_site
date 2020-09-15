import { useUpdateQuantity } from "../../hooks/updateQuantityHook";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { AddToCart, ToUpdate } from "../../redux/actions/CartAction";

const CartItem = (props) => {
  const {
    image,
    name,
    description,
    unitPrice,
    quantity,
    selected,
    data,
    HandleSelect,
    DeleteItem,
  } = props;

  const [updateItem, setUpdateItem] = useState(null);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [loading, success] = useUpdateQuantity(updateItem ? updateItem : null);

  const dispatch = useDispatch();

  const UpdateQuantity = (toUpdate, quantity, data) => {
    setCurrentQuantity(quantity);
    setUpdateItem(data);
    dispatch(AddToCart(toUpdate, quantity, data));
  };

  useEffect(() => {
    if (success) {
      setUpdateItem(null);
    }
  }, [loading]);

  useEffect(() => {
    if (currentQuantity == 0) setCurrentQuantity(1);
  }, [currentQuantity]);

  return (
    <tr>
      <td className="w-8 border border-teal-400 text-center">
        <input
          type="checkbox"
          onChange={(e) => {
            HandleSelect(name, e.target.checked, data);
          }}
          checked={selected ? selected : false}
        />
      </td>
      <td className="border border-teal-400 text-center">
        <img className="w-20 h-20 p-2 float-left" src={`/product/${image}`} />
        <h2>{name}</h2>
        <p className="text-teal-500">{description}</p>
      </td>
      <td className="border border-teal-400 text-center">
        &#8369; {`${unitPrice.toFixed(2)}`}
      </td>
      <td className="border border-teal-400 text-center">
        <button
          onClick={(e) => UpdateQuantity(true, currentQuantity - 1, data)}
          className="px-2 text-center text-white bg-teal-400 border border-teal-400"
        >
          &#8722;
        </button>
        <input
          className="w-10 text-center border border-teal-400"
          type="text"
          value={currentQuantity}
          onChange={(e) =>
            UpdateQuantity(true, e.target.value > 0 ? e.target.value : 1, data)
          }
        />
        <button
          onClick={(e) => UpdateQuantity(true, currentQuantity + 1, data)}
          className="px-2 text-center text-white bg-teal-400 border border-teal-400"
        >
          &#43;
        </button>
      </td>
      <td className="border border-teal-400 text-center">
        &#8369; {(unitPrice * currentQuantity).toFixed(2)}
      </td>
      <td className="m-auto border border-teal-400 text-center">
        <button
          onClick={(e) => {
            DeleteItem(data);
          }}
          className="text-white font-bold p-2 bg-teal-400"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
