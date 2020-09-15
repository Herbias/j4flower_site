import CustomButton from "../components/CustomButton";
import { useIconHook } from "../hooks/iconHook";

import { QuickBuildOpen } from "../redux/actions/QuickBuildAction";
import { useDispatch, useSelector } from "react-redux";
const Items = (props) => {
  const { icon, title, category } = props;

  const quickBuild = useSelector((state) => state.QuickBuildReducer.quickBuild);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={"m-auto ".concat(
          category == quickBuild.category &&
            quickBuild.isOpen &&
            "border-b-2 border-active"
        )}
        onClick={() =>
          dispatch(
            QuickBuildOpen(
              quickBuild.category == category ? false : true,
              quickBuild.category == category ? "" : title,
              quickBuild.category == category ? "" : category
            )
          )
        }
      >
        <div className="p-2 text-gray-700">
          <CustomButton
            classNames={"rounded-full border border-gray-900 p-2 ".concat(
              category == quickBuild.category &&
                quickBuild.isOpen &&
                "border-b-2 border-active text-active"
            )}
            icon={icon}
            size={10}
            view={24}
          />
        </div>
        <p
          className={"w-full text-center ".concat(
            category == quickBuild.category &&
              quickBuild.isOpen &&
              "text-active"
          )}
        >
          {title}
        </p>
      </div>
    </>
  );
};
React.memo(Items);

const QuickBuild = (props) => {
  const quickBuild = useSelector((state) => state.QuickBuildReducer.quickBuild);

  const setIcon = useIconHook("set");
  const memoryIcon = useIconHook("memory");
  const gpuIcon = useIconHook("gpu");
  const motherboardIcon = useIconHook("motherboard");
  const cpuIcon = useIconHook("cpu");
  const storageIcon = useIconHook("storage");
  const psuIcon = useIconHook("psu");
  const coolerIcon = useIconHook("cooler");
  const regulatorIcon = useIconHook("avr");
  const caseIcon = useIconHook("case");
  const keyboardIcon = useIconHook("keyboard");
  const mouseIcon = useIconHook("mouse");
  const monitorIcon = useIconHook("monitor");
  const accessoriesIcon = useIconHook("accessories");
  const printerIcon = useIconHook("printer");
  return (
    <>
      <div className="h-32 bg-gray-100 shadow flex items-center content-center justify-center">
        <Items icon={setIcon} title={"Set"} category={"set"} />
        <Items icon={memoryIcon} title={"RAM"} category={"ram"} />
        <Items icon={gpuIcon} title={"GPU"} category={"gpu"} />
        <Items
          icon={motherboardIcon}
          title={"M. Board"}
          category={"motherboard"}
        />
        <Items icon={cpuIcon} title={"CPU"} category={"cpu"} />
        <Items icon={storageIcon} title={"Storage"} category={"storage"} />
        <Items icon={psuIcon} title={"PSU"} category={"psu"} />
        <Items icon={coolerIcon} title={"Cooler"} category={"cooler"} />
        <Items icon={regulatorIcon} title={"V. Reg."} category={"avr"} />
        <Items icon={caseIcon} title={"Case"} category={"case"} />
        <Items icon={keyboardIcon} title={"K. Board"} category={"keyboard"} />
        <Items icon={mouseIcon} title={"Mouse"} category={"mouse"} />
        <Items icon={monitorIcon} title={"Monitor"} category={"monitor"} />
        <Items
          icon={accessoriesIcon}
          title={"Accrs."}
          category={"accessories"}
        />
        <Items icon={printerIcon} title={"Printer"} category={"printer"} />
      </div>
      <div className="block w-full bg-gray-300">
        {quickBuild.isOpen && props.children}
      </div>
    </>
  );
};

export default React.memo(QuickBuild);
