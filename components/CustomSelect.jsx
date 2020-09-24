import { useState, useCallback, useEffect } from "react";

const DisplayBox = (props) => {
  const { selected, Display } = props;
  return (
    <div className="flex overflow-visible" onClick={(e) => Display(true)}>
      <p className="w-32 px-2 bg-gray-200 border border-grey-200 hover:bg-blue-200">
        {typeof selected == "number" && selected == 0 && "No"}
        {typeof selected == "number" && selected == 1 && "Yes"}
        {typeof selected == "string" && `${selected}`}
      </p>
      <div className="text-gray-600 inline-block border border-grey-200 cursor-pointer cursor-pointer hover:text-blue-200">
        <svg
          className="fill-current h-5 w-5 m-auto"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 22 22"
        >
          <polyline points="6 9 12 15 18 9"></polyline>{" "}
        </svg>
      </div>
    </div>
  );
};

const OptionBox = (props) => {
  const { handleChange, option, name } = props;

  return (
    <div className="w-full mt-8 z-10 border border-grey-200 bg-white absolute top-0 left-0 mt-8 z-10">
      <p
        className="h-6 border-b border-gray-200 px-2 hover:bg-blue-200 hover:text-white cursor-pointer"
        onClick={(e) => {
          handleChange(name, null);
        }}
      ></p>
      {option &&
        option.map((elm, index) => {
          return (
            <p
              key={index}
              title={elm.value}
              className="border-b border-gray-200 px-2 hover:bg-blue-200 hover:text-white cursor-pointer"
              onClick={(e) => {
                handleChange(name, elm.name);
              }}
            >
              {typeof elm.name == "number" && elm.name == 0 && "No"}
              {typeof elm.name == "number" && elm.name == 1 && "Yes"}
              {typeof elm.name == "string" && `${elm.name}`}
            </p>
          );
        })}
    </div>
  );
};

export default function CustomSelect(props) {
  const { handleChange, option, name } = props;
  const [displayOption, setDisplayOption] = useState(false);

  const ShowOption = useCallback((display) => {
    setDisplayOption(!displayOption);
  });

  const HideOption = useCallback((name, value) => {
    setDisplayOption(!displayOption);
    handleChange(name, value);
  });

  return (
    <div className="ml-2 w-full text-black relative">
      <DisplayBox selected={props.selected} Display={ShowOption} />
      {displayOption && (
        <OptionBox handleChange={HideOption} name={name} option={option} />
      )}
    </div>
  );
}
