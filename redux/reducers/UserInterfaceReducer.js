const initState = {
  showMiniCart: false,
};

export default function userInterfaceState(state = initState, action) {
  switch (action.type) {
    case "SHOW_MINI_CART":
      return { ...state, showMiniCart: action.payload };
    default:
      return state;
  }
}
