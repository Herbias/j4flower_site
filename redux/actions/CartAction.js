const AddToCart = (toUpdate, quantity, data) => {
  return {
    type: "ADD_TO_CART",
    payload: { product: data, quantity: quantity, toUpdate: toUpdate },
  };
};

const ToUpdate = (toUpdate) => {
  return {
    type: "UPDATE_CART",
    payload: toUpdate,
  };
};

export { AddToCart, ToUpdate };
