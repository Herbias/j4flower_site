import Link from "next/link";
import { DoLogin } from "../../redux/actions/UserAction";
import { useSelector, useDispatch } from "react-redux";

const UserLogout = () => {
  return (
    <>
      <Link href="/signin">
        <a className="ml-2 mr-2" href="#">
          Login
        </a>
      </Link>
      <Link href="/signin">
        <a className="mr-2" href="#">
          Signup
        </a>
      </Link>
    </>
  );
};

const UserLogin = () => {
  return (
    <>
      {" "}
      <a className="ml-2 mr-2" href="#">
        Order
      </a>
      <a className="mr-2" href="#">
        Account
      </a>
    </>
  );
};

function TopNavigation({ props }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer);

  const Logout = () => {
    dispatch(DoLogin(false, null));
    localStorage.setItem("isLogin", false);
    localStorage.removeItem("user");
  };

  return (
    <div className="flex justify-center w-full m-auto absolute top-0">
      <div className="border rounded-b-lg border-gray-300 text-sm p-1">
        {user.isLogin ? <UserLogin /> : <UserLogout />}

        <a className="mr-2" href="#">
          Services
        </a>
        <Link href="/about">
          <a className="mr-2">About</a>
        </Link>
        {user.isLogin && (
          <a
            onClick={() => {
              Logout();
            }}
            className="mr-2"
          >
            Logout
          </a>
        )}
      </div>
    </div>
  );
}

export default TopNavigation;
