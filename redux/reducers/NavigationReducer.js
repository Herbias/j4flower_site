const initState = {
  isCartDropdownOpen: false,
  isWishlistDropdownOpen: false,
  isCategoriesDropdownOpen: false,
};

export default function navigationState(state = initState, action) {
  switch (action.type) {
    case "IS_CART_DROPDOWN_OPEN":
      return {
        ...state,
        isCartDropdownOpen: action.payload,
      };
    case "IS_WISHLIST_DROPDOWN_OPEN":
      return {
        ...state,
        isWishlistDropdownOpen: action.payload,
      };
    case "IS_CATEGORIES_DROPDOWN_OPEN":
      return {
        ...state,
        isCategoriesDropdownOpen: action.payload,
      };
    default:
      return state;
  }
}
