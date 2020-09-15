import { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Dropdown from "./Navigation/Dropdown";

export default function CustomButton(props) {
  const { classNames, size, view, icon, type, title, styles, data } = props;
  const [dropdownDisplayed, displayDropdown] = useState(false);
  const [toggleDropdown, setDropdown] = useState(false);

  const userInterface = useSelector((state) => state.UserInterfaceReducer);

  const MountDropdown = (shouldMount) => {
    displayDropdown(true);
    setDropdown(true);
  };

  const UnMountDropdown = () => {
    setDropdown(false);
  };

  const ShowDropDown = useCallback(() => {
    setDropdown(true);
  }, [toggleDropdown]);

  const HideDropDown = useCallback(() => {
    setDropdown(false);
  }, [toggleDropdown]);

  useEffect(() => {
    toggleDropdown ? displayDropdown(true) : displayDropdown(false);
  }, [toggleDropdown]);

  return (
    <Fragment>
      <div
        className={classNames + " cursor-pointer"}
        // onMouseEnter={MountDropdown}
        // onMouseLeave={UnMountDropdown}
        style={styles}
      >
        <svg
          className={size && `fill-current h-${size} w-${size} m-auto`}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${view} ${view}`}
        >
          <path d={icon} />
        </svg>
      </div>
      {/* {type == "dropdown" && userInterface.showMiniCart && (
        <Dropdown title={title} Show={ShowDropDown} Hide={HideDropDown} />
      )} */}

      {/* <Dropdown title={title} Show={ShowDropDown} Hide={HideDropDown} /> */}
      {/* {type == "dropdown" && dropdownDisplayed && (
        <Dropdown title={title} Show={ShowDropDown} Hide={HideDropDown} />
      )} */}
    </Fragment>
  );
}
