import { useIconHook } from "../../hooks/iconHook";
import CustomButton from "../CustomButton";
import { useState, useCallback, useEffect } from "react";

export default function (props) {
  const { name, image, price, index } = props;
  const heartIcon = useIconHook("heart");

  return (
    <div
      key={index}
      className="w-40 h-auto mx-4 my-2 bg-white border border-white"
    >
      <img className="object-contain h-40" src={`/product/${image}`} />
      <div className="p-2 m-auto text-center">
        <h4 className="truncate">{name && name}</h4>
        <h6>&#8369;{price && price.toFixed(2)}</h6>
      </div>
      <div className="flex">
        <CustomButton
          classNames="w-40 p-2 inline-block bg-teal-300 text-white border-2 border-white cursor-pointer"
          size="5"
          view="20"
          icon={heartIcon}
        />
      </div>
    </div>
  );
}
