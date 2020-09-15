const DoLogin = (isLogin, user) => {
  return {
    type: "DO_LOGIN",
    payload: {
      isLogin: isLogin,
      data: user,
    },
  };
};

const UpdateUserInformation = (
  firstname,
  middlename,
  lastname,
  email,
  telno,
  mobileno
) => {
  return {
    type: "UPDATE_PERSONAL_INFORMATION",
    payload: {
      firstname,
      middlename,
      lastname,
      email,
      telno,
      mobileno,
    },
  };
};

const UpdateShippingInformation = (
  address1,
  address2,
  city,
  province,
  zipcode
) => {
  return {
    type: "UPDATE_SHIPPING_INFORMATION",
    payload: {
      address1,
      address2,
      city,
      province,
      zipcode,
    },
  };
};

const ToUpdatePersonalInformation = (toUpdate) => {
  return {
    type: "TO_UPDATE_PERSONAL_INFORMATION",
    payload: toUpdate,
  };
};

const ToUpdateShippingInformation = (toUpdate) => {
  return {
    type: "TO_UPDATE_SHIPPING_INFORMATION",
    payload: toUpdate,
  };
};

const ToUpdate = (toUpdate) => {
  return {
    type: "TO_UPDATE",
    payload: toUpdate,
  };
};

const UserLogout = (isLogin) => {
  return {
    type: "USER_LOGOUT",
    payload: {
      isLogin: isLogin,
      data: null,
    },
  };
};

export {
  DoLogin,
  UpdateUserInformation,
  UpdateShippingInformation,
  ToUpdatePersonalInformation,
  ToUpdateShippingInformation,
  ToUpdate,
  UserLogout,
};
