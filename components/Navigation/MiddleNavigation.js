import CustomButton from "../CustomButton";
import { useIconHook } from "../../hooks/iconHook";
import { useSelector } from "react-redux";
import { useGetCartItemCount } from "../../hooks/getCartItemCount";
import { useRouter } from "next/router";

const MiddleNavigation = (props) => {
  const searchIcon = useIconHook("search");
  const heartIcon = useIconHook("heart");
  const cartIcon = useIconHook("cart");
  const logo = useIconHook("logo");

  const router = useRouter();

  const [loading, cartItemCount] = useGetCartItemCount();

  return (
    <div className="w-full m-6 pt-4 flex items-center">
      <div
        onClick={() => router.push("/")}
        className="w-1/4 flex items-center content-center justify-center cursor-pointer"
      >
        <CustomButton
          classNames={"border-2 border-white rounded-full mr-2"}
          size={12}
          view={24}
          icon={logo}
        />
        <span className="font-semibold text-xl tracking-tight">AppyGo</span>
      </div>
      <div className="w-2/4">
        <div className="flex w-full border rounded-r-l text-black">
          <input
            className="h-10 w-11/12 indent-4"
            type="search"
            placeholder="Search for flower?"
          />
          <CustomButton
            classNames="py-2 px-4 text-white"
            size={5}
            view={20}
            icon={searchIcon}
          />
        </div>
      </div>
      <div className="w-1/4 px-16 flex justify-around">
        <div className="w-2/4 text-center relative inline-block">
          {cartItemCount > 0 && (
            <div className="absolute z-10 flex justify-center items-center content-center mr-2 w-6 h-6 top-0 right-0 bg-yellow-200 border border-b rounded-full">
              <p className="w-full text-gray-600 text-center font-bold">
                {cartItemCount}
              </p>
            </div>
          )}
          <CustomButton
            classNames="h-10 w-10 p-2 inline-block border-white border-2 rounded-full"
            size={5}
            view={20}
            icon={cartIcon}
            type="dropdown"
            title="Cart"
          />
        </div>
        {/* <div className="w-2/4 text-center">
          <CustomButton
            classNames="h-10 w-10 p-2 inline-block border-white border-2 rounded-full"
            icon={cartIcon}
            size={5}
            type="dropdown"
            title="Cart"
          />
        </div> */}
      </div>
    </div>
  );
};

export default MiddleNavigation;
