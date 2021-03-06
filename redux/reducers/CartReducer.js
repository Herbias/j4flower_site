const initState = {
  product: {},
  toUpdate: false,
  quantity: 0,
  showMiniCart: false,
  cartItems: null,
};

export default function cartState(state = initState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        product: action.payload.product,
        toUpdate: action.payload.toUpdate,
        quantity: action.payload.quantity,
      };
    case "UPDATE_CART":
      return { ...state, toUpdate: action.payload };
    case "UPDATE_CART_ITEMS":
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
}
