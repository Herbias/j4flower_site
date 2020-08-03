const initState = {
  quickBuild: {
    isOpen: false,
    title: "",
    category: "",
    products: null,
    filters: null,
    selected: null,
    search: "",
  },
};

export default function IndexState(state = initState, action) {
  console.log(action);
  switch (action.type) {
    case "QUICK_BUILD_OPEN":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
