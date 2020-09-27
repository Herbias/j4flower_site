import { useIconHook } from "../../hooks/iconHook";
import CustomButton from "../CustomButton";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, UpdateCartItems } from "../../redux/actions/CartAction";
import { useAddToCartHook } from "../../hooks/addToCartHook";
import { useEffect, useState } from "react";

const ProductCard = (props) => {
  const { name, image, price, index, data } = props;

  const cartIcon = useIconHook("cart");

  const cart = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const [addItem, setAddItem] = useState(null);
  const [loading, success] = useAddToCartHook(addItem ? addItem : null);

  const addToCart = (data) => {
    setAddItem(data);
    dispatch(AddToCart(true, 1, data));
  };

  useEffect(() => {
    if (success) {
      setAddItem(null);
      dispatch(UpdateCartItems(success));
    }
  }, [loading]);

  return (
    <div
      key={index}
      className="w-40 h-auto mx-4 my-2 bg-white border border-white"
    >
      <img
        className="object-contain h-40"
        src={`http://assets.appygo.io/appygo/image/${data.categoryName}/${data.image}`}
      />
      <div className="p-2 m-auto text-center">
        <Link
          href={`/shop/${data.categoryName}/${data.name.replace(
            /\s|\//g,
            "-"
          )}/${data.id}`}
        >
          <a>
            <h4 className="truncate">{name && name}</h4>
          </a>
        </Link>
        <h6>&#8369;{price && price.toFixed(2)}</h6>
      </div>
      <div
        className="flex items-center justify-center content-center"
        onClick={(e) => addToCart(data)}
      >
        <div className="flex content-center self-auto items-center">
          <CustomButton
            classNames="flex w-40 h-8 p-full bg-teal-300 text-white border-2 border-white cursor-pointer"
            size="5"
            view="20"
            icon={cartIcon}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
