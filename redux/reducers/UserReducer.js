const initState = {
  isLogin: false,
  data: null,
  updatePersonalInformation: false,
  updateShippingInformation: false,
};

export default function UserState(state = initState, action) {
  switch (action.type) {
    case "DO_LOGIN":
      return {
        ...state,
        isLogin: action.payload.isLogin,
        data: action.payload.data,
      };
    case "UPDATE_PERSONAL_INFORMATION":
      return {
        ...state,
        data: {
          ...state.data,
          firstname: action.payload.firstname,
          middlename: action.payload.middlename,
          lastname: action.payload.lastname,
          email: action.payload.email,
          telno: action.payload.telno,
          mobileno: action.payload.mobileno,
        },
      };
    case "UPDATE_SHIPPING_INFORMATION":
      return {
        ...state,
        data: {
          ...state.data,
          address1: action.payload.address1,
          address2: action.payload.address2,
          city: action.payload.city,
          province: action.payload.province,
          zipcode: action.payload.zipcode,
        },
      };
    case "TO_UPDATE_PERSONAL_INFORMATION":
      return {
        ...state,
        updatePersonalInformation: action.payload,
      };

    case "TO_UPDATE_SHIPPING_INFORMATION":
      return {
        ...state,
        updateShippingInformation: action.payload,
      };
    case "TO_UPDATE":
      return {
        ...state,
        updatePersonalInformation: action.payload,
        updateShippingInformation: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        isLogin: action.payload.isLogin,
      };

    default:
      return state;
  }
}
