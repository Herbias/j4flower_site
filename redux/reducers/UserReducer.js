const initState = {
  isLogin: false,
  user: null,
};

export default function UserState(state = initState, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        action,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        action,
      };
    default:
      return state;
  }
}
