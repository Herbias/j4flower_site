import CustomButton from "../CustomButton";
import { useIconHook } from "../../hooks/iconHook";

const MiddleNavigation = (props) => {
  const searchIcon = useIconHook("search");
  const heartIcon = useIconHook("heart");
  const cartIcon = useIconHook("cart");
  const logo = useIconHook("logo");

  return (
    <div className="w-full m-6 flex items-center">
      <div className="w-1/4 flex items-center content-center justify-center">
        <CustomButton
          classNames={"border-4 rounded-full mr-2"}
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
          <CustomButton
            classNames="h-10 w-10 p-2 inline-block border-white border-2 rounded-full"
            size={5}
            view={20}
            icon={heartIcon}
            type="dropdown"
            title="Wishlist"
          />
        </div>
        <div className="w-2/4 text-center">
          <CustomButton
            classNames="h-10 w-10 p-2 inline-block border-white border-2 rounded-full"
            icon={cartIcon}
            size={5}
            type="dropdown"
            title="Cart"
          />
        </div>
      </div>
    </div>
  );
};

export default MiddleNavigation;
