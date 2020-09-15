import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Signin(props) {
  const user = useSelector((state) => state.UserReducer);
  const router = useRouter();

  useEffect(() => {
    if (user.isLogin) router.push("/");
  }, [user.isLogin]);

  return (
    <MainLayout>
      <div className="w-full flex">
        <div className="w-3/5 ml-10 mr-2 my-10 pb-6 border border-teal-400">
          <h1 className="py-2 px-6 bg-teal-400 border-b border-teal-200 text-white text-2xl font-bold">
            Create an account
          </h1>
          <Signup />
        </div>
        <div className="w-2/5 ml-2 mr-10 my-10  pb-6 border border-teal-400">
          <h1 className="py-2 px-6 bg-teal-400 border-b border-teal-400 text-white text-2xl font-bold">
            Already have an account?
          </h1>
          <Login />
        </div>
      </div>
    </MainLayout>
  );
}
