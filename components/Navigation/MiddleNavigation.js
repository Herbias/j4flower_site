import CustomButton from "../CustomButton";
import { useIconHook } from "../../hooks/iconHook";

const MiddleNavigation = (props) => {
  const searchIcon = useIconHook("search");
  const heartIcon = useIconHook("heart");
  const cartIcon = useIconHook("cart");

  return (
    <div className="w-full m-6 flex items-center">
      <div className="w-1/4">
        <img className="inline-block h-16 w-16" src="/logo.png" />
        <span className="inline-block font-semibold text-xl tracking-tight">
          J4 Flower Shop
        </span>
      </div>
      <div className="w-2/4">
        <div className="flex w-full border rounded-r-l text-black">
          <input
            className="h-10 w-11/12 indent-4"
            type="search"
            placeholder="Search for flower?"
          />
          <CustomButton classNames="py-2 px-4 text-white" icon={searchIcon} />
        </div>
      </div>
      <div className="w-1/4 px-16 flex justify-around">
        <div className="w-2/4 text-center relative inline-block">
          <CustomButton
            classNames="h-10 w-10 p-2 inline-block border-white border-2 rounded-full"
            icon={heartIcon}
            type="dropdown"
            title="Wishlist"
          />
        </div>
        <div className="w-2/4 text-center">
          <CustomButton
            classNames="h-10 w-10 p-2 inline-block border-white border-2 rounded-full"
            icon={cartIcon}
            type="dropdown"
            title="Cart"
          />
        </div>
      </div>
    </div>
  );
};

export default MiddleNavigation;
