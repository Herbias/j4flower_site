const UserLogin = (isLogin, user) => {
  return {
    type: "USER_LOGIN",
    payload: {
      isLogin: isLogin,
      user: user,
    },
  };
};

const UserLogout = (isLogin) => {
  return {
    type: "USER_LOGOUT",
    payload: {
      isLogin: isLogin,
      user: null,
    },
  };
};
